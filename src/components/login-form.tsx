"use client"

import { Network, TrendingUp, Users, Eye, EyeOff, Briefcase, MessageCircle } from "lucide-react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import Image from "next/image"
import Link from "next/link"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const passwordRegex = /^.{8,}$/

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("Email is required")
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
    }
  }

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("Password is required")
    } else if (!passwordRegex.test(value)) {
      setPasswordError("Password must be at least 8 characters")
    } else {
      setPasswordError("")
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    validateEmail(value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    validatePassword(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    validateEmail(email)
    validatePassword(password)

    if (!emailError && !passwordError && email && password) {
      console.log("Login attempt:", { email, password })
    }
  }

  return (
    <div className={cn("flex flex-col gap-8 lg:gap-10", className)} {...props}>

      <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-10">
        <div className="flex justify-end">
          <AnimatedThemeToggler className="hover:cursor-pointer" />
        </div>

        <div className="flex flex-col gap-8 lg:gap-10">
          <div className="flex flex-col items-center gap-6 lg:items-start lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:items-start lg:w-full">
              <div className="relative lg:hidden">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-jagged-ice-500 shadow-lg">
                  <Network className="size-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-jagged-ice-500 shadow-md">
                  <MessageCircle className="size-3 text-white" />
                </div>
              </div>
              <div className="text-center space-y-2 lg:text-left lg:space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-jagged-ice-700 dark:text-jagged-ice-300 lg:hidden">
                  Venli
                </h1>
                <div className="lg:space-y-2">
                  <p className="text-lg lg:text-3xl font-bold text-foreground">Welcome back</p>
                  <p className="hidden lg:block text-lg text-muted-foreground font-medium">
                    Ready to connect?
                  </p>
                </div>
                <p className="text-sm lg:text-base text-muted-foreground max-w-sm lg:max-w-none lg:hidden">
                  Where founders, VCs, and talent connect, collaborate, and grow together
                </p>
                <div className="hidden lg:block space-y-3 pt-2">
                  <p className="text-base text-muted-foreground">
                    Login to continue to your account
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-green-500"></div>
                      <span>Online now</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-jagged-ice-500" />
                      <span>2,847 active members</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-muted-foreground flex-wrap justify-center lg:hidden">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-jagged-ice-500" />
                <span>10K+ Members</span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center gap-2">
                <Briefcase className="size-4 text-jagged-ice-500" />
                <span>500+ Job Posts</span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-jagged-ice-500" />
                <span>$2B+ Connected</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="your@email.com"
                  value={email}
                  onChange={handleEmailChange}
                  className={cn(
                    "h-12 px-4 bg-background border-2 transition-all duration-300 focus:shadow-lg focus:shadow-jagged-ice-400/20",
                    emailError
                      ? "border-red-400 focus:border-red-400 hover:border-red-300"
                      : "focus:border-jagged-ice-400 hover:border-jagged-ice-200"
                  )}
                />
                {emailError && (
                  <p className="text-sm text-red-500 mt-1">{emailError}</p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-jagged-ice-600 hover:text-jagged-ice-400 dark:text-jagged-ice-400 dark:hover:text-jagged-ice-200 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={cn(
                      "h-12 px-4 pr-12 bg-background border-2 transition-all duration-300 focus:shadow-lg focus:shadow-jagged-ice-400/20",
                      passwordError
                        ? "border-red-400 focus:border-red-400 hover:border-red-300"
                        : "focus:border-jagged-ice-400 hover:border-jagged-ice-200"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 bg-jagged-ice-500 hover:bg-jagged-ice-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Login
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              type="button"
              size="lg"
              className="w-full h-12 border-2 hover:bg-accent/50 hover:border-jagged-ice-300 hover:shadow-md transition-all duration-300 group"
              onClick={() => {
                const backendUrl = process.env.NEXT_PUBLIC_BACKEND_CORE_BASE_URL || 'http://localhost:4000'
                window.location.href = `${backendUrl}/api/auth/google`
              }}
            >
              {/* <svg className="size-5 mr-3 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24"> */}
              {/*   <path */}
              {/*     d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" */}
              {/*     fill="currentColor" */}
              {/*   /> */}
              {/* </svg> */}
              <Image src={"/icons/google.png"} alt="google icon" width={20} height={20} />
              Continue with Google
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                New to Venli?{" "}
                <Link href="/signup" className="font-medium text-jagged-ice-600 hover:text-jagged-ice-400 dark:text-jagged-ice-400 dark:hover:text-jagged-ice-200 transition-colors">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>

      <div className="text-center text-xs text-muted-foreground pt-2">
        <p>
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-jagged-ice-600 hover:text-jagged-ice-400 dark:text-jagged-ice-400 dark:hover:text-jagged-ice-200 transition-colors underline underline-offset-2">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-jagged-ice-600 hover:text-jagged-ice-400 dark:text-jagged-ice-400 dark:hover:text-jagged-ice-200 transition-colors underline underline-offset-2">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
