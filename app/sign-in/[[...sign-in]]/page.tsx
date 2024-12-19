import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-b from-blue-600/5 via-purple-600/5 to-transparent pointer-events-none" />
      
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Mon Budget
          </h1>
          <p className="text-gray-400">Connectez-vous pour gérer vos finances</p>
        </div>

        <SignIn 
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
              card: "bg-card/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl p-8",
              headerTitle: "text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent",
              headerSubtitle: "text-gray-400 text-sm mt-2",
              socialButtonsBlockButton: "bg-white/10 hover:bg-white/20 border-0 text-white transition-all duration-200 rounded-xl",
              socialButtonsBlockButtonText: "font-medium",
              socialButtonsBlockButtonArrow: "text-white",
              formButtonPrimary: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 w-full py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-500/20",
              footerActionLink: "text-blue-400 hover:text-blue-300 transition-colors",
              formFieldInput: "bg-white/10 border-white/10 text-white placeholder:text-gray-500 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200",
              formFieldLabel: "text-gray-300 text-sm font-medium mb-1.5",
              dividerLine: "bg-white/10",
              dividerText: "text-gray-400 bg-card/95 px-3",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-blue-400 hover:text-blue-300",
              formFieldErrorText: "text-red-400 text-sm mt-1",
              alertText: "text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-4",
              headerBackIcon: "text-gray-400 hover:text-white transition-colors",
              headerBackLink: "text-gray-400 hover:text-white transition-colors",
              formFieldSuccessText: "text-emerald-400 text-sm mt-1",
              otpCodeFieldInput: "bg-white/10 border-white/10 text-white rounded-xl w-12 h-12 text-center",
              formResendCodeLink: "text-blue-400 hover:text-blue-300",
              navbar: "hidden",
              navbarButtons: "hidden",
              card__background: "bg-gradient-to-br from-card/95 to-card/90 backdrop-blur-xl",
              main: "p-0",
            },
            layout: {
              socialButtonsPlacement: "bottom",
              showOptionalFields: false,
              shimmer: true,
            },
          }}
        />
      </div>
    </div>
  );
} 