"use client";

import { roboto_slab } from "../styles/fonts";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { siteConfig } from "@/config/site";
import { Check } from "lucide-react";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function IndexPage() {
  const [nameInput, setNameInput] = useState("");
  const [ageInput, setAgeInput] = useState<number>(0);
  const [interestInput, setInterestInput] = useState("");
  const [wantsAudio, setWantsAudio] = useState(false);
  const [voices, setVoices] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<String>("");

  useEffect(() => {
    async function getVoices() {
      try {
        const response = await fetch("https://api.elevenlabs.io/v1/voices");

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();

        setVoices(data.voices);
      } catch (error) {
        console.log(error.message);
      }
    }
    getVoices();
  }, []);

  const prompt = `Create a 400 word personalised bedtime story for a child named ${nameInput} who is interested in ${interestInput}. The story should be suitable for a ${ageInput} year old`;

  const generateResponse = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setResponse("");
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResponse((prev) => prev + chunkValue);
    }
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-5xl text-center my-4">
        Personalised bedtime stories
      </h1>
      <div className="flex justify-between">
        <section className="w-1/4 mt-4 ml-8">
          <form>
            <div className="grid w-full max-w-sm items-center gap-1.5 ">
              <Label htmlFor="name">Child's name</Label>
              <Input
                className="border"
                type="text"
                name="name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-2 ">
                <Label htmlFor="age">Child's age</Label>
                <Input
                  className="border"
                  type="number"
                  name="age"
                  value={ageInput}
                  onChange={(e) => setAgeInput(parseInt(e.target.value, 10))}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                <Label htmlFor="age">Interests</Label>
                <Input
                  className="border"
                  type="text"
                  name="interest"
                  placeholder="dinosaurs, space, animals"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Switch
                  id="wantsAudio"
                  checked={wantsAudio}
                  onCheckedChange={setWantsAudio}
                />
                <Label htmlFor="airplane-mode">
                  AI synthesized voice to read the story?{" "}
                </Label>
              </div>
              {wantsAudio && (
                <div className="flex items-center space-x-2 mt-2">
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map((voice) => (
                        <SelectItem key={voice.voice_id} value={voice.voice_id}>
                          {voice.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {!loading ? (
                <Button
                  onClick={(e) => generateResponse(e)}
                  className="mt-4 bg-fuchsia-500 border-b-4 border-r-4 border-black rounded-lg shadow-lg place-self-end"
                >
                  <BookOpen className="mr-2 h-4 w-4" /> Generate a story
                </Button>
              ) : (
                <button
                  disabled
                  className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white"
                >
                  <div className="animate-pulse font-bold tracking-widest">
                    ...
                  </div>
                </button>
              )}
            </div>
          </form>
        </section>
        <div className="w-2/3 mr-8 flex flex-col h-screen border rounded-lg">
          {response ? (
            <div className="flex space-x-4 mt-10 text-left">
              <p className="p-10 text-2xl text-left whitespace-pre-wrap">
                {response}
              </p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
    //   <Checkbox />
  );
}
