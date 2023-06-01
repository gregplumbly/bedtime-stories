"use client";

import { Button } from "@/components/ui/button";

export default function ContactForm() {
  async function handleSubmit(event: any) {
    event.preventDefault();

    const data = {
      first_name: String(event.target.first_name.value),
      last_name: String(event.target.last_name.value),
      email: String(event.target.email.value),
      message: String(event.target.message.value),
    };

    console.log(data);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Message sent successfully!");
    }
    if (!response.ok) {
      //   console.log("An error occured.");
      // log the error to the console
      console.log(response);
    }
  }

  return (
    <>
      <h1 className="text-4xl text-center my-4 md:text-7xl ">Contact</h1>
      <form
        className="w-full max-w-3xl mx-auto px-0 lg:p-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-dark text-xs font-secondary mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-dark border border-dark rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary"
              type="text"
              id="firstName"
              name="first_name"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-dark text-xs font-secondary mb-2"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-dark border border-dark rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary"
              type="text"
              id="last_name"
              name="last_name"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-dark text-xs font-secondary mb-2"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-dark border border-dark rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary"
              id="email"
              type="email"
              name="email"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-dark text-xs font-secondary mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              name="message"
              required
              className=" no-resize appearance-none block w-full bg-gray-200 text-dark border border-dark rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary h-48 resize-none"
              id="message"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            //   onClick={(e) => generateStory(e)}
            className="mt-4 p-4 px-8 rounded-full shadow-lg bg-cyan-500 duration-200 hover:opacity-80"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
