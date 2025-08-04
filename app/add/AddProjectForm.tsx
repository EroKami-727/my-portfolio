// app/add/AddProjectForm.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { handleProjectAction } from './actions'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { X, Check, ChevronsUpDown, Loader2 } from 'lucide-react'

const PREDEFINED_STACKS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Firebase', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Docker'
];

type Project = { id: string; title: string; description: string; stacks: string[]; tags: string[]; imageUrl?: string; liveDemoUrl?: string; githubUrl?: string; };

// Define a flexible state type
type State = {
  success: boolean;
  message?: string;
  error?: string;
};

const initialState: State = { success: false, message: '', error: '' };

export function AddProjectForm({ setDialogOpen, projectToEdit }: { setDialogOpen: (isOpen: boolean) => void; projectToEdit?: Project }) {
  const [state, formAction] = useFormState(handleProjectAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const [selectedStacks, setSelectedStacks] = useState<string[]>(projectToEdit?.stacks || []);
  const [selectedTags, setSelectedTags] = useState<string[]>(projectToEdit?.tags || []);
  const [commandInputValue, setCommandInputValue] = useState('');

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setDialogOpen(false);
    }
    if (state.error) {
      toast.error(state.error);
    }
  }, [state, setDialogOpen]);

  const handleStackKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && commandInputValue) {
      e.preventDefault();
      const newStack = commandInputValue.trim();
      if (newStack && !selectedStacks.includes(newStack)) {
        setSelectedStacks(prev => [...prev, newStack]);
      }
      setCommandInputValue('');
    }
  };

  return (
    <form ref={formRef} action={formAction} className="space-y-6 py-4">
      <input type="hidden" name="action" value={projectToEdit ? 'update' : 'add'} />
      {projectToEdit && <input type="hidden" name="id" value={projectToEdit.id} />}

      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input id="title" name="title" defaultValue={projectToEdit?.title} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={projectToEdit?.description} required />
      </div>
      
      <div className="space-y-2">
        <Label>Stacks / Libraries</Label>
        <input type="hidden" name="stacks" value={selectedStacks.join(',')} />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" className="w-full justify-between font-normal">
              <span className="truncate">{selectedStacks.length > 0 ? selectedStacks.join(', ') : 'Select stacks...'}</span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput 
                placeholder="Search or add stack..." 
                value={commandInputValue}
                onValueChange={setCommandInputValue}
                onKeyDown={handleStackKeyDown}
              />
              <CommandList>
                <CommandEmpty>No results. Press Enter to add.</CommandEmpty>
                <CommandGroup>
                  {PREDEFINED_STACKS.map((stack) => (
                    <CommandItem key={stack} onSelect={() => setSelectedStacks(p => p.includes(stack) ? p.filter(s => s !== stack) : [...p, stack])}>
                      <Check className={`mr-2 h-4 w-4 ${selectedStacks.includes(stack) ? 'opacity-100' : 'opacity-0'}`} />
                      {stack}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="pt-2 flex flex-wrap gap-1">
          {selectedStacks.map(stack => (
            <Badge key={stack} variant="secondary">
              {stack}
              <button type="button" onClick={() => setSelectedStacks(p => p.filter(s => s !== stack))} className="ml-1.5 ring-offset-background rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <input type="hidden" name="tags" value={selectedTags.join(',')} />
         <Select onValueChange={(value) => setSelectedTags([value])} defaultValue={selectedTags[0]}>
            <SelectTrigger><SelectValue placeholder="Select a tag" /></SelectTrigger>
            <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Corporate">Corporate</SelectItem>
            </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="liveDemoUrl">Live Demo URL (Optional)</Label>
          <Input id="liveDemoUrl" name="liveDemoUrl" defaultValue={projectToEdit?.liveDemoUrl} placeholder="https://..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="githubUrl">GitHub URL (Optional)</Label>
          <Input id="githubUrl" name="githubUrl" defaultValue={projectToEdit?.githubUrl} placeholder="https://github.com/..." />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Project Image</Label>
        <Input id="image" name="image" type="file" accept="image/*" />
        {projectToEdit?.imageUrl && <p className="text-sm text-muted-foreground">Current image is set. Upload a new one to replace it.</p>}
      </div>
      
      <SubmitButton isEditing={!!projectToEdit} />
    </form>
  )
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Project' : 'Add Project')}
    </Button>
  )
}