"use client";

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
import va from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/react";
import { BookOpen } from "lucide-react";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function IndexPage() {
  const [nameInput, setNameInput] = useState("");
  const [ageInput, setAgeInput] = useState<number>(5);
  const [interestInput, setInterestInput] = useState("");
  const [wantsAudio, setWantsAudio] = useState(false);
  const [voices, setVoices] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [story, setStory] = useState<String>("");
  const [audioSrc, setAudioSrc] = useState("");
  const [audio, setAudio] = useState(null);
  const [showAudio, setShowAudio] = useState(false);
  const [storyStyle, setStoryStyle] = useState("rhyming verse");

  //   useEffect(() => {
  //     async function getVoices() {
  //       try {
  //         const response = await fetch("https://api.elevenlabs.io/v1/voices");

  //         if (!response.ok) {
  //           throw new Error("Something went wrong");
  //         }

  //         const data = await response.json();

  //         setVoices(data.voices);
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     }
  //     getVoices();
  //   }, []);

  const prompt = `Create a 500 word personalised 5 minute bedtime story in the ${storyStyle} style for a child named ${nameInput} who is interested in ${interestInput}. The story should be suitable for a ${ageInput} year old`;
  //   useEffect(() => {
  //     async function generateAudio() {
  //       const response = await fetch("/api/elevenlabs", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           message: story,
  //           voice: "21m00Tcm4TlvDq8ikWAM",
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Something went wrong");
  //       }

  //       const { file } = await response.json();

  //       setAudio(file);
  //     }
  //     generateAudio();
  //   }, [showAudio]);

  const generateStory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStory("");
    setLoading(true);
    va.track("Story", { age: ageInput, interests: interestInput });
    console.log(prompt);

    const response = await fetch("/api/generate-story", {
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
      setStory((prev) => prev + chunkValue);
    }

    if (done) {
      console.log("Stream complete");
      //   setShowAudio(true);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center my-4 md:text-7xl ">
        Personalised bedtime stories
      </h1>
      <div className="flex flex-col sm:flex-row ml-4">
        <div className="mt-4 p-6 m-6 md:w-1/3">
          <form>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Child's name</Label>
              <Input
                className="border"
                type="text"
                name="name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-2 ">
                <Label htmlFor="age">
                  {nameInput ? `${nameInput}'s age` : "Child's age"}
                </Label>

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
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                <Label htmlFor="style">Style</Label>
                <Select onValueChange={(value) => setStoryStyle(value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select story style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="1" value="Rhyming Verse">
                      Rhyming Verse
                    </SelectItem>
                    <SelectItem key="2" value="Repetition">
                      Repetition
                    </SelectItem>
                    <SelectItem key="3" value="Prose">
                      Prose
                    </SelectItem>
                    <SelectItem key="4" value="Onomatopoeia">
                      Onomatopoeia
                    </SelectItem>
                    <SelectItem key="5" value="Alliteration">
                      Alliteration
                    </SelectItem>
                    <SelectItem key="6" value="Narrative Poetry">
                      Narrative Poetry
                    </SelectItem>
                    <SelectItem key="7" value="iambic pentameter">
                      Iambic Pentameter
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* <div className="flex items-center space-x-2 mt-2">
                <Switch
                  id="wantsAudio"
                  checked={wantsAudio}
                  onCheckedChange={setWantsAudio}
                />
                <Label htmlFor="airplane-mode">
                  AI synthesized voice to read the story?{" "}
                </Label>
              </div> */}
              {/* {wantsAudio && (
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
              )} */}
              {!loading ? (
                <Button
                  onClick={(e) => generateStory(e)}
                  className="mt-4 p-4 px-8 rounded-full shadow-lg bg-cyan-500 duration-200 hover:opacity-80"
                >
                  <BookOpen className="mr-2 h-4 w-4" /> Generate a story
                </Button>
              ) : (
                <button
                  disabled
                  className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white"
                >
                  <div className="animate-pulse font-bold tracking-widest">
                    ...generating
                  </div>
                </button>
              )}
            </div>
          </form>

          {/* {showAudio && (
            <div>
              <h2>Audio Player</h2>
              <audio autoPlay controls src={`audio/${audio}`} />
            </div>
          )} */}
        </div>
        <div className="text-left max-w-xl">
          <div className="flex mt-4 text-left">
            <p className="p-4 text-2xl text-left whitespace-pre-wrap">
              {story}
            </p>
          </div>
        </div>
      </div>
      <Analytics />
    </>
    //   <Checkbox />
  );
}
