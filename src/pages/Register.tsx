import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import DotGrid from "@/components/DotGrid";

const degreeOptions = ["B.Tech", "B.Sc", "BCA", "MCA", "M.Tech", "MBA", "Other"] as const;
const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"] as const;

const Register = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    degree: "",
    collegeName: "",
    department: "",
    yearOfStudy: "",
    contactNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputBaseClasses = useMemo(
    () =>
      "w-full rounded-lg border border-primary/20 bg-black/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition focus:border-primary/60 focus:ring-2 focus:ring-primary/40",
    []
  );

  const handleChange =
    (field: keyof typeof formValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <main className="relative min-h-screen bg-black text-foreground overflow-hidden">
      
      {/* 🔵 DOT GRID PAGE BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={4}
          gap={18}
          baseColor="#1a1329"
          activeColor="#6d4bff"
          proximity={120}
          shockRadius={220}
          shockStrength={4}
          resistance={800}
          returnDuration={1.4}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        <Navbar />

        <section className="pt-28 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            
            {/* HEADER */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                <span className="text-gradient">Register for KRIVVASS&apos;26</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Secure your spot for the biggest cultural celebration of the year.
              </p>
            </div>

            {/* FORM CARD */}
            <div className="relative rounded-3xl border border-primary/20 bg-black/70 p-6 md:p-10 backdrop-blur-xl shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formValues.fullName}
                      onChange={handleChange("fullName")}
                      placeholder="Enter your full name"
                      className={inputBaseClasses}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formValues.email}
                      onChange={handleChange("email")}
                      placeholder="you@example.com"
                      className={inputBaseClasses}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formValues.password}
                        onChange={handleChange("password")}
                        placeholder="Create a secure password"
                        className={`${inputBaseClasses} pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={formValues.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        placeholder="Re-enter your password"
                        className={`${inputBaseClasses} pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Degree */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Degree</label>
                    <select
                      value={formValues.degree}
                      onChange={handleChange("degree")}
                      className={inputBaseClasses}
                    >
                      <option value="" disabled>Select degree</option>
                      {degreeOptions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  {/* College */}
                  <div>
                    <label className="block text-sm font-medium mb-2">College Name</label>
                    <input
                      type="text"
                      value={formValues.collegeName}
                      onChange={handleChange("collegeName")}
                      placeholder="Enter your college name"
                      className={inputBaseClasses}
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Department</label>
                    <input
                      type="text"
                      value={formValues.department}
                      onChange={handleChange("department")}
                      placeholder="Your department"
                      className={inputBaseClasses}
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Year of Study</label>
                    <select
                      value={formValues.yearOfStudy}
                      onChange={handleChange("yearOfStudy")}
                      className={inputBaseClasses}
                    >
                      <option value="" disabled>Select year</option>
                      {yearOptions.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Number</label>
                    <input
                      type="tel"
                      value={formValues.contactNumber}
                      onChange={handleChange("contactNumber")}
                      placeholder="+91 98765 43210"
                      className={inputBaseClasses}
                    />
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-primary/10 pt-6">
                  <p className="text-xs text-muted-foreground">
                    By registering, you agree to follow all event guidelines.
                  </p>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary via-accent to-secondary text-white text-sm font-semibold shadow-lg hover:scale-[1.02]"
                  >
                    Complete Registration
                  </button>
                </div>

              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
