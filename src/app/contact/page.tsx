import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Contact Us</h1>
        <p className="text-lg text-green-900">
          Have questions? We&apos;d love to hear from you.
        </p>
        <div className="h-1 w-24 bg-green-600 mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="border-green-200 bg-white">
          <CardHeader className="bg-green-50 border-b border-green-100">
            <CardTitle className="text-green-800">Email</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-900">info@carboncot.com</p>
            <p className="text-sm text-green-700 mt-1">
              We typically respond within 24 hours
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-white">
          <CardHeader className="bg-green-50 border-b border-green-100">
            <CardTitle className="text-green-800">Phone</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-900">+1 (555) 123-4567</p>
            <p className="text-sm text-green-700 mt-1">
              Mon-Fri, 9am-5pm EST
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-green-200 bg-white">
        <CardHeader className="bg-green-50 border-b border-green-100">
          <CardTitle className="text-green-800">Send us a message</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-green-800 mb-1"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                className="border-green-300 focus:border-green-700"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-green-800 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="border-green-300 focus:border-green-700"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-green-800 mb-1"
              >
                Subject
              </label>
              <Input
                id="subject"
                type="text"
                placeholder="What is this about?"
                className="border-green-300 focus:border-green-700"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-green-800 mb-1"
              >
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Your message..."
                rows={5}
                className="border-green-300 focus:border-green-700"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white"
            >
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

