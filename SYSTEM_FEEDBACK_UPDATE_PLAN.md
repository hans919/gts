# System Feedback Updates Required

## Files That Need Updating

### ✅ Already Updated (Using AlertDialog)
1. **src/pages/surveys/SurveyList.tsx** - Delete survey confirmation
2. **src/pages/admin/EmploymentSurveysManagement.tsx** - Delete survey confirmation

### 🔄 Files to Update - Replace alert() with Toast

#### Graduate Portal Pages
1. **src/pages/graduate-portal/GraduateDashboard.tsx**
   - Line 197: `alert('Profile updated successfully!')` → Success toast
   - Line 200: `alert(error...)` → Error toast

2. **src/pages/graduate-portal/CareerUpdates.tsx**
   - Line 91: `alert('Career update added successfully!')` → Success toast

3. **src/pages/graduate-portal/EmploymentSurvey.tsx**
   - Line 86: `alert('Survey submitted successfully!')` → Success toast

4. **src/pages/graduate-portal/PrivacySettings.tsx** ⚠️ COMPLEX
   - Line 83: `alert('Privacy settings updated successfully!')` → Success toast
   - Line 86: `alert(error...)` → Error toast
   - Line 109: `alert('Failed to export data')` → Error toast
   - Line 114-120: `window.confirm()` + `window.prompt()` → AlertDialog with input
   - Line 125: `alert('Account deletion cancelled')` → Info toast
   - Line 135: `alert('Your account has been deleted')` → Success toast
   - Line 140: `alert('Failed to delete account')` → Error toast

5. **src/pages/graduate-portal/GraduateSettings.tsx**
   - Line 73: `alert('Profile photo updated successfully!')` → Success toast
   - Line 103: `alert(error...)` → Error toast
   - Line 113: `alert('New passwords do not match!')` → Error toast
   - Line 118: `alert('Password must be at least 8 characters long!')` → Error toast
   - Line 135: `alert('Password changed successfully!')` → Success toast
   - Line 143: `alert(error...)` → Error toast

6. **src/pages/graduate-portal/TakeSurvey.tsx**
   - Line 81: `alert('Please answer question...')` → Error toast
   - Line 116: `alert('Survey submitted successfully!')` → Success toast

7. **src/pages/graduate-portal/FeedbackSupport.tsx**
   - Line 92: `alert('Support ticket submitted successfully!')` → Success toast
   - Line 104: `alert(error...)` → Error toast

8. **src/pages/graduate-portal/ResetPassword.tsx**
   - Line 55: `alert('Password reset successful!')` → Success toast

#### Admin Pages
9. **src/pages/admin/SupportTicketsManagement.tsx**
   - Line 70: `alert('Response submitted successfully!')` → Success toast
   - Line 76: `alert(error...)` → Error toast
   - Line 81: `confirm('Are you sure...')` → AlertDialog
   - Line 88: `alert('Ticket deleted successfully!')` → Success toast
   - Line 92: `alert('Failed to delete ticket')` → Error toast

10. **src/pages/admin/JobsManagement.tsx**
    - Line 66: `alert('Job updated successfully!')` → Success toast
    - Line 73: `alert('Job created successfully!')` → Success toast
    - Line 80: `alert(error...)` → Error toast
    - Line 99: `confirm('Are you sure...')` → AlertDialog
    - Line 106: `alert('Job deleted successfully!')` → Success toast
    - Line 110: `alert('Failed to delete job')` → Error toast

11. **src/pages/admin/CareerServicesManagement.tsx**
    - Line 63: `alert('Service updated successfully!')` → Success toast
    - Line 70: `alert('Service created successfully!')` → Success toast
    - Line 77: `alert(error...)` → Error toast
    - Line 95: `confirm('Are you sure...')` → AlertDialog
    - Line 102: `alert('Service deleted successfully!')` → Success toast
    - Line 106: `alert('Failed to delete service')` → Error toast

#### Other Pages
12. **src/pages/graduates/GraduateList.tsx**
    - Line 89: `confirm('Are you sure...')` → AlertDialog
    - Line 99: `alert('Failed to delete graduate')` → Error toast

13. **src/pages/Reports.tsx**
    - Line 34: `alert('Exporting report...')` → Info toast

## Components Created

### ✅ Completed
- `src/components/ui/alert-dialog.tsx` - AlertDialog component
- `src/components/ui/toast.tsx` - Toast component
- `src/components/ui/toaster.tsx` - Toaster provider
- `src/hooks/use-toast.ts` - Toast hook
- Updated `src/App.tsx` - Added Toaster provider

## Usage Examples

### Toast Notifications
```tsx
import { useToast } from "@/hooks/use-toast"

const { toast } = useToast()

// Success
toast({
  title: "Success!",
  description: "Your changes have been saved.",
  variant: "success",
})

// Error
toast({
  title: "Error",
  description: "Something went wrong.",
  variant: "destructive",
})

// Default/Info
toast({
  title: "Information",
  description: "This is an informational message.",
})
```

### AlertDialog for Confirmations
```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Priority Order

### High Priority (User-facing actions)
1. Graduate Portal pages (most used by end users)
2. Admin management pages (delete confirmations)

### Medium Priority
3. Settings and profile updates
4. Report exports

## Dependencies Installed
- ✅ @radix-ui/react-alert-dialog
- ✅ @radix-ui/react-toast
- ✅ class-variance-authority
