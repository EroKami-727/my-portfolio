// app/add/actions.ts
'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { db, storage } from '@/lib/firebase'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

const GITHUB_PLACEHOLDER = 'coming-soon';

// Define proper types
interface ActionState {
  success?: boolean;
  error?: string;
  message?: string;
}

// --- AUTH ACTION ---
// Corrected
export async function handleLogin(password: string) {
    if (password === process.env.ADMIN_PASSWORD) {
      const cookieStore = await cookies() // Get the cookie store
      cookieStore.set('admin-auth', 'true', { // Then use it
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
      })
      return { success: true }
    }
    return { success: false, error: 'Invalid password.' }
  }

// --- DATA FETCHING ACTION ---
export async function getProjects() {
  const projectsCol = collection(db, 'projects');
  const q = query(projectsCol, orderBy('createdAt', 'desc'));
  const projectSnapshot = await getDocs(q);
  const projectList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return projectList;
}

// --- DATA MUTATION ACTIONS ---
export async function handleProjectAction(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  const action = formData.get('action') as string;
  
  if (action === 'add') return handleAddProject(formData);
  if (action === 'update') return handleUpdateProject(formData);
  
  return { success: false, error: 'Invalid action.' };
}

async function handleAddProject(formData: FormData): Promise<ActionState> {
  try {
    const projectData = await prepareProjectData(formData);
    await addDoc(collection(db, 'projects'), projectData);
    revalidatePath('/');
    revalidatePath('/add');
    return { success: true, message: 'Project added successfully!' };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

async function handleUpdateProject(formData: FormData): Promise<ActionState> {
  const id = formData.get('id') as string;
  if (!id) return { success: false, error: 'Project ID is missing.' };

  try {
    const projectData = await prepareProjectData(formData, id);
    const projectRef = doc(db, 'projects', id);
    await updateDoc(projectRef, projectData);
    revalidatePath('/');
    revalidatePath('/add');
    return { success: true, message: 'Project updated successfully!' };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function handleDeleteProject(id: string, imageUrl?: string): Promise<ActionState> {
  try {
    // Delete image from storage if it exists
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef).catch(err => console.warn("Image delete failed, may not exist:", err));
    }
    // Delete document from Firestore
    await deleteDoc(doc(db, 'projects', id));
    revalidatePath('/');
    revalidatePath('/add');
    return { success: true, message: 'Project deleted.' };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

// --- HELPER FUNCTIONS ---
async function prepareProjectData(formData: FormData, existingImageUrl?: string) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const stacks = formData.get('stacks') as string;
  const liveDemoUrl = formData.get('liveDemoUrl') as string;
  let githubUrl = formData.get('githubUrl') as string;
  const tags = formData.get('tags') as string;
  const imageFile = formData.get('image') as File;

  let imageUrl = existingImageUrl || '';
  if (imageFile && imageFile.size > 0) {
    if (existingImageUrl) {
        // Delete old image before uploading new one
        const oldImageRef = ref(storage, existingImageUrl);
        await deleteObject(oldImageRef).catch(err => console.warn("Old image delete failed:", err));
    }
    const storageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(storageRef);
  }

  if (!githubUrl) {
    githubUrl = GITHUB_PLACEHOLDER;
  }
  
  return {
    title,
    description,
    stacks: stacks ? stacks.split(',').map(s => s.trim()) : [],
    liveDemoUrl,
    githubUrl,
    tags: tags ? tags.split(',').map(t => t.trim()) : [],
    imageUrl,
    createdAt: serverTimestamp(),
  };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return 'An unknown error occurred.';
}