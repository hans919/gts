# Script to update all alert() and confirm() to toast notifications
# Run this from the frontend directory

Write-Host "Updating system feedback to use shadcn/ui components..." -ForegroundColor Cyan

# Files to update
$files = @(
    "src/pages/graduate-portal/GraduateSettings.tsx",
    "src/pages/graduate-portal/TakeSurvey.tsx",
    "src/pages/graduate-portal/FeedbackSupport.tsx",
    "src/pages/graduate-portal/ResetPassword.tsx",
    "src/pages/graduate-portal/PrivacySettings.tsx",
    "src/pages/admin/SupportTicketsManagement.tsx",
    "src/pages/admin/JobsManagement.tsx",
    "src/pages/admin/CareerServicesManagement.tsx",
    "src/pages/graduates/GraduateList.tsx",
    "src/pages/Reports.tsx"
)

Write-Host "`n✅ Components already created:" -ForegroundColor Green
Write-Host "  - AlertDialog (alert-dialog.tsx)"
Write-Host "  - Toast (toast.tsx, toaster.tsx)"
Write-Host "  - useToast hook (use-toast.ts)"

Write-Host "`n📋 Files that need manual updating:" -ForegroundColor Yellow
foreach ($file in $files) {
    Write-Host "  - $file" -ForegroundColor Gray
}

Write-Host "`n💡 To complete the updates, follow SYSTEM_FEEDBACK_UPDATE_PLAN.md" -ForegroundColor Cyan
Write-Host "   Each file needs:" -ForegroundColor Gray
Write-Host "   1. Add: import { useToast } from '@/hooks/use-toast'" -ForegroundColor Gray
Write-Host "   2. Add: const { toast } = useToast() in component" -ForegroundColor Gray
Write-Host "   3. Replace alert() with toast() calls" -ForegroundColor Gray
Write-Host "   4. Replace confirm() with AlertDialog components" -ForegroundColor Gray

Write-Host "`n✨ Example toast usage:" -ForegroundColor Cyan
Write-Host @"
toast({
  title: "Success!",
  description: "Your changes have been saved.",
  variant: "success", // or "destructive" for errors
})
"@ -ForegroundColor Gray

Write-Host "`nSee SYSTEM_FEEDBACK_UPDATE_PLAN.md for detailed instructions." -ForegroundColor Green
