import { LoginForm } from "@/components/login-form"
import { Network, Users, Briefcase, MessageCircle, Star, Zap } from "lucide-react"
import { EnhancedPointer } from "@/components/ui/enhanced-pointer"
import { TypingAnimation } from "@/components/ui/typing-animation"

export default function LoginPage() {
  return (
    <div className="min-h-svh bg-gradient-to-br from-background via-background to-jagged-ice-50/20 dark:to-jagged-ice-950/20 relative">
      <EnhancedPointer className="hidden lg:block" />
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">

          {/* Left side - Branding and Features */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-jagged-ice-400 to-jagged-ice-600">
                  <Network className="size-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-jagged-ice-600 to-jagged-ice-800 bg-clip-text text-transparent">
                  Venli
                </h1>
              </div>
              <div className="space-y-4">
                <div className="min-h-[2.5rem] lg:min-h-[3rem] flex items-start">
                  <TypingAnimation
                    className="text-3xl lg:text-4xl font-bold text-foreground leading-tight"
                    duration={100}
                    delay={500}
                  >
                    The social network for startup professionals
                  </TypingAnimation>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Connect with VCs, founders, and top talent. Share insights, discover opportunities,
                  and build your startup community.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-card/40 border border-border/30">
                <div className="flex size-10 items-center justify-center rounded-lg bg-jagged-ice-100 dark:bg-jagged-ice-900">
                  <Users className="size-5 text-jagged-ice-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Connect & Network</h3>
                  <p className="text-sm text-muted-foreground">Build meaningful relationships with founders, investors, and talent</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card/40 border border-border/30">
                <div className="flex size-10 items-center justify-center rounded-lg bg-jagged-ice-100 dark:bg-jagged-ice-900">
                  <Briefcase className="size-5 text-jagged-ice-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Discover Opportunities</h3>
                  <p className="text-sm text-muted-foreground">Find your next role, co-founder, or investment opportunity</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card/40 border border-border/30">
                <div className="flex size-10 items-center justify-center rounded-lg bg-jagged-ice-100 dark:bg-jagged-ice-900">
                  <MessageCircle className="size-5 text-jagged-ice-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Share & Learn</h3>
                  <p className="text-sm text-muted-foreground">Exchange insights, ask questions, and grow together</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  <div className="size-8 rounded-full bg-jagged-ice-200 border-2 border-background"></div>
                  <div className="size-8 rounded-full bg-jagged-ice-300 border-2 border-background"></div>
                  <div className="size-8 rounded-full bg-jagged-ice-400 border-2 border-background"></div>
                </div>
                <span>Join 10,000+ professionals</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:max-w-lg">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
