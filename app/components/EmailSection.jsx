"use client";
import React, { useState } from "react";
import GithubIcon from "../../public/github-icon.svg";
import LinkedinIcon from "../../public/linkedin-icon.svg";
import Image from "next/image";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const resData = await response.json();

    if (response.status === 200) {
      console.log("Message sent.");
      setEmailSubmitted(true);
    }
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-8 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/30 to-transparent rounded-full h-80 w-80 z-0 blur-2xl absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">Contact</p>
        <h5 className="font-display text-3xl font-bold text-white my-2">
          Let&apos;s build something useful.
        </h5>
        <p className="text-blue-200/70 mb-6 max-w-md">
          {" "}
          I&apos;m currently looking for new opportunities, my inbox is always
          open. Whether you have a question or just want to say hi, I&apos;ll
          try my best to get back to you!
        </p>
        <div className="socials flex flex-row gap-4 items-center">
          { <a href="https://github.com/xowin" className="rounded-full bg-sky-500/20 border border-sky-400/30 p-2 shadow-sm hover:bg-sky-500/30 transition">
            <Image src={GithubIcon} alt="Github Icon" />
          </a> }
          { <a href="https://www.linkedin.com/in/christian-rodrigues-91993b233/" className="rounded-full bg-sky-500/20 border border-sky-400/30 p-2 shadow-sm hover:bg-sky-500/30 transition">
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </a> }
        </div>
      </div>
      <div className="rounded-3xl border border-blue-400/20 bg-blue-950/40 backdrop-blur p-6 shadow-xl shadow-blue-950/40">
        {emailSubmitted ? (
          <p className="text-emerald-400 text-sm mt-2">
            Email sent successfully!
          </p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-blue-100 block mb-2 text-sm font-semibold"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="bg-blue-950/60 border border-blue-400/30 placeholder-blue-300/40 text-white text-sm rounded-xl block w-full p-3 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400"
                placeholder="example@google.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-blue-100 block text-sm mb-2 font-semibold"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-blue-950/60 border border-blue-400/30 placeholder-blue-300/40 text-white text-sm rounded-xl block w-full p-3 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400"
                placeholder="Just saying hi"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-blue-100 block text-sm mb-2 font-semibold"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="bg-blue-950/60 border border-blue-400/30 placeholder-blue-300/40 text-white text-sm rounded-xl block w-full p-3 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 min-h-[140px]"
                placeholder="Let's talk about..."
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-semibold py-3 px-5 rounded-xl w-full shadow-lg shadow-sky-500/30 transition"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
