import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Have questions about carbon credits, projects, or partnerships?
            We’re here to help.
          </p>
          <div className="h-1 w-24 bg-green-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* CONTACT INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
                <Mail size={18} />
              </div>
              <CardTitle className="text-green-800">Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 font-medium">info@carboncot.com</p>
              <p className="text-sm text-gray-500 mt-1">
                We usually respond within 24 hours
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
                <Phone size={18} />
              </div>
              <CardTitle className="text-green-800">Call Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 font-medium">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-500 mt-1">
                Mon–Fri · 9:00 AM – 5:00 PM
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CONTACT FORM */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl text-green-800">
              Send us a message
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Fill out the form below and our team will get back to you.
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NAME */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input
                  placeholder="Your full name"
                  className="border-gray-300 focus:border-green-600 focus:ring-0"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="border-gray-300 focus:border-green-600 focus:ring-0"
                />
              </div>

              {/* SUBJECT */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input
                  placeholder="How can we help?"
                  className="border-gray-300 focus:border-green-600 focus:ring-0"
                />
              </div>

              {/* MESSAGE */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  rows={5}
                  placeholder="Write your message here..."
                  className="border-gray-300 focus:border-green-600 focus:ring-0"
                />
              </div>

              {/* SUBMIT */}
              <div className="md:col-span-2 pt-2">
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-green-700 hover:bg-green-800 text-white px-8 py-3 text-base"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
