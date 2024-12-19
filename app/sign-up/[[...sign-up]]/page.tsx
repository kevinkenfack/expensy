import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-b from-blue-600/5 via-purple-600/5 to-transparent pointer-events-none" />
      
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Mon Budget
          </h1>
          <p className="text-gray-400">Créez votre compte pour commencer</p>
        </div>

        <SignUp 
          appearance={{
            variables: {
              colorPrimary: "#3b82f6",
              colorBackground: "#111111",
              colorText: "white",
              colorTextSecondary: "#9ca3af",
              colorInputBackground: "rgba(255, 255, 255, 0.1)",
              colorInputText: "white",
              colorTextOnPrimaryBackground: "white",
            },
            elements: {
              rootBox: "w-full",
              card: "bg-card/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              socialButtonsBlockButton: "bg-white/10 hover:bg-white/20 border-0 text-white",
              formButtonPrimary: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
              footerActionLink: "text-blue-400 hover:text-blue-300",
              formFieldInput: "bg-white/10 border-white/10 text-white placeholder:text-gray-500",
              formFieldLabel: "text-gray-300",
              dividerLine: "bg-white/10",
              dividerText: "text-gray-400",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-blue-400 hover:text-blue-300",
              formFieldErrorText: "text-red-400",
              alertText: "text-red-400",
              headerBackIcon: "text-gray-400",
              headerBackLink: "text-gray-400 hover:text-white",
            },
            layout: {
              socialButtonsPlacement: "bottom",
              showOptionalFields: false,
            },
          }}
        />
      </div>
    </div>
  );
} 