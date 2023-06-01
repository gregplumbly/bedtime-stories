export default function Page() {
  return (
    <div>
      <h1 className="text-4xl text-center my-4 md:text-7xl ">About</h1>
      <p className="ml-8 mt-2">
        I created this to learn a bit about using ChatGPT and the OpenAI API.
      </p>
      <p className="ml-8">
        I shared it on a whatsapp parents group and was surprised to see how
        much people enjoyed it. I hope you and your children enjoy it too.
      </p>

      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="text-center mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Simple. Unique. Magical.
            </h1>
            <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
              Transforming bedtime stories with just a few simple steps.
            </p>
          </div>
          <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            <div class="p-4 md:w-1/3 md:mb-0 mb-6 flex">
              <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
                <i class="fas fa-user-friends fa-lg"></i>
              </div>
              <div class="flex-grow pl-6">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
                  Create Your Child's Character
                </h2>
                <p class="leading-relaxed text-base">
                  Start the journey by telling us a little about your child.
                  Name, age, favorite color, cherished pet, or beloved toy – we
                  weave all these details into the story.
                </p>
              </div>
            </div>
            <div class="p-4 md:w-1/3 md:mb-0 mb-6 flex">
              <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
                <i class="fas fa-book-open fa-lg"></i>
              </div>
              <div class="flex-grow pl-6">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
                  Choose Your Adventure
                </h2>
                <p class="leading-relaxed text-base">
                  Next, select from our vast library of adventures. Whether it's
                  a journey to the moon, a dive under the ocean, or a trek in
                  the jungle, we have it all.
                </p>
              </div>
            </div>
            <div class="p-4 md:w-1/3 md:mb-0 mb-6 flex">
              <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
                <i class="fas fa-magic fa-lg"></i>
              </div>
              <div class="flex-grow pl-6">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
                  Let The Magic Begin
                </h2>
                <p class="leading-relaxed text-base">
                  Sit back as our advanced AI, ChatGPT, crafts a personalized,
                  one-of-a-kind bedtime story. Each tale is instantly generated
                  and ready for reading – anytime, anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
