<!-- src/lib/components/DevConsole.svelte -->
<script lang="ts">
  import { Terminal, FileCode, Flame, HelpCircle } from 'lucide-svelte';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';

  type TerminalLine = {
    id: number;
    text: string;
    type: 'system' | 'muted' | 'user' | 'success' | 'error';
  };

  type CodeLine = {
    num: number;
    text: string;
  };

  let currentTab = $state<'AboutMe.ts' | 'Stack.json'>('AboutMe.ts');
  let commandInput = $state('');

  let nextId = 1;

  function createLine(
    text: string,
    type: TerminalLine['type']
  ): TerminalLine {
    return {
      id: nextId++,
      text,
      type
    };
  }

  let terminalHistory = $state<TerminalLine[]>([
    createLine('TechNurse OS v1.0 initialized.', 'system'),
    createLine("Type 'help' or click code tabs to explore.", 'muted')
  ]);

  const files: Record<string, CodeLine[]> = {
    'AboutMe.ts': [
      {
        num: 1,
        text:
          '<span class="text-indigo-500 dark:text-indigo-400">const</span> <span class="text-blue-600 dark:text-blue-400">developer</span> = &#123;'
      },
      {
        num: 2,
        text:
          '  <span class="text-sky-600 dark:text-sky-400">name</span>: <span class="text-emerald-600 dark:text-emerald-400">"Racheal Ogunmodede"</span>,'
      },
      {
        num: 3,
        text:
          '  <span class="text-sky-600 dark:text-sky-400">role</span>: <span class="text-emerald-600 dark:text-emerald-400">"Frontend Developer"</span>,'
      },
      {
        num: 4,
        text:
          '  <span class="text-sky-600 dark:text-sky-400">focus</span>: <span class="text-emerald-600 dark:text-emerald-400">"Accessible UI Systems"</span>,'
      },
      {
        num: 5,
        text:
          '  <span class="text-sky-600 dark:text-sky-400">stack</span>: <span class="text-emerald-600 dark:text-emerald-400">"React, SvelteKit, TypeScript"</span>'
      },
      {
        num: 6,
        text: '&#125;;'
      }
    ],

    'Stack.json': [
      {
        num: 1,
        text: '&#123;'
      },
      {
        num: 2,
        text:
          '  <span class="text-sky-600 dark:text-sky-400">"languages"</span>: [<span class="text-emerald-600 dark:text-emerald-400">"TypeScript"</span>, <span class="text-emerald-600 dark:text-emerald-400">"JavaScript"</span>],'
      },
      {
        num: 3,
        text:
          '  <span class="text-sky-600 dark:text-sky-400">"frameworks"</span>: [<span class="text-emerald-600 dark:text-emerald-400">"React"</span>, <span class="text-emerald-600 dark:text-emerald-400">"Next.js"</span>, <span class="text-emerald-600 dark:text-emerald-400">"SvelteKit"</span>],'
      },
      {
        num: 4,
        text:
          '  <span class="text-sky-600 dark:text-sky-400">"styling"</span>: [<span class="text-emerald-600 dark:text-emerald-400">"Tailwind CSS"</span>, <span class="text-emerald-600 dark:text-emerald-400">"CSS"</span>],'
      },
      {
        num: 5,
        text:
          '  <span class="text-sky-600 dark:text-sky-400">"tools"</span>: [<span class="text-emerald-600 dark:text-emerald-400">"Git"</span>, <span class="text-emerald-600 dark:text-emerald-400">"Figma"</span>, <span class="text-emerald-600 dark:text-emerald-400">"Vercel"</span>]'
      },
      {
        num: 6,
        text: '&#125;'
      }
    ]
  };

  function executeCommand() {
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    terminalHistory = [
      ...terminalHistory,
      createLine(`➜ ~ ${commandInput}`, 'user')
    ];

    if (cmd === 'help') {
      terminalHistory = [
        ...terminalHistory,
        createLine('Available commands:', 'system'),
        createLine('projects  - Open projects page', 'muted'),
        createLine('stack     - View tech stack', 'muted'),
        createLine('clear     - Clear terminal output', 'muted')
      ];
    } else if (cmd === 'projects' || cmd === 'cd projects') {
      terminalHistory = [
        ...terminalHistory,
        createLine('Navigating to /projects...', 'success')
      ];

      setTimeout(() => {
        goto(`${base}/projects`);
      }, 600);
    } else if (cmd === 'stack') {
      currentTab = 'Stack.json';

      terminalHistory = [
        ...terminalHistory,
        createLine('Switched to Stack.json', 'system')
      ];
    } else if (cmd === 'clear') {
      terminalHistory = [];
    } else {
      terminalHistory = [
        ...terminalHistory,
        createLine(
          `bash: command not found: ${cmd}. Type "help"`,
          'error'
        )
      ];
    }

    commandInput = '';
  }

  const fileNames = Object.keys(files);
</script>

<section
  class="relative w-full overflow-hidden border-y border-line/30 bg-surface/20 px-4 py-16 md:py-24"
>
  <div class="relative z-10 mx-auto max-w-5xl">
    <!-- Header -->
    <div class="mx-auto mb-12 max-w-xl text-center">
      <h2
        class="font-display text-3xl font-extrabold tracking-tight text-fg md:text-4xl"
      >
        Interactive Sandbox
      </h2>
      <p class="mt-3 text-sm text-muted">
        Explore my stack, projects, and experience through this terminal-inspired
        interface.
      </p>
    </div>

    <div
      class="flex min-h-115 w-full flex-col overflow-hidden rounded-xl border border-line bg-surface/30 shadow-xl backdrop-blur-md transition-colors duration-300 dark:shadow-2xl"
    >
      <div
        class="flex items-center justify-between border-b border-line bg-ide-header px-4 py-2.5 font-mono text-[11px] text-muted select-none"
      >
        <div class="flex items-center gap-1.5">
          <div class="size-2.5 rounded-full bg-red-500/30 dark:bg-red-500/40"></div>
          <div
            class="size-2.5 rounded-full bg-yellow-500/30 dark:bg-yellow-500/40"
          ></div>
          <div
            class="size-2.5 rounded-full bg-green-500/30 dark:bg-green-500/40"
          ></div>
          <span class="ml-2 font-medium tracking-wide">
            TechNurse Window Engine
          </span>
        </div>

        <span class="flex items-center gap-1 text-accent/80">
          <Flame size="12" />
          Live Kernel
        </span>
      </div>

      <div
        class="flex border-b border-line bg-ide-tab font-mono text-xs select-none"
      >
        {#each fileNames as filename (filename)}
          <button
            type="button"
            onclick={() => {
              currentTab = filename as 'AboutMe.ts' | 'Stack.json';
            }}
            class={`relative flex items-center gap-2 border-r border-line px-4 py-2.5 transition duration-150 ${
              currentTab === filename
                ? 'bg-ide-bg font-semibold text-fg'
                : 'text-muted/60 hover:bg-surface-2 hover:text-fg'
            }`}
          >
            {#if currentTab === filename}
              <div class="absolute inset-x-0 top-0 h-0.5 bg-accent"></div>
            {/if}

            <FileCode
              size="13"
              class={currentTab === filename
                ? 'text-accent'
                : 'text-muted/40'}
            />

            {filename}
          </button>
        {/each}
      </div>

      <div
        class="flex-1 select-text bg-ide-bg p-6 font-mono text-[13px] leading-relaxed"
      >
        {#each files[currentTab] as line (line.num)}
          <div class="flex min-h-5.5 gap-4">
            <span
              class="w-5 select-none pt-0.5 text-right text-[11px] text-muted/30"
            >
              {line.num}
            </span>

            <p class="tracking-wide text-muted/90">
              {@html line.text}
            </p>
          </div>
        {/each}

        <div class="flex min-h-5.5 gap-4 animate-pulse">
          <span
            class="w-5 select-none pt-0.5 text-right text-[11px] text-muted/30"
          >
            {files[currentTab].length + 1}
          </span>
          <span class="mt-0.75 h-4 w-1.5 bg-accent/60"></span>
        </div>
      </div>

      <div
        class="flex h-52 flex-col justify-end border-t border-line bg-ide-terminal p-4 font-mono text-[12px]"
      >
        <div
          class="mb-2 flex items-center gap-1.5 border-b border-line/50 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted/50 select-none"
        >
          <Terminal size="11" />
          Interactivity Console Shell
        </div>

        <div
          class="scrollbar-none mb-2 flex flex-1 flex-col gap-1 overflow-y-auto pr-1 text-left"
        >
          {#each terminalHistory as line (line.id)}
            <p
              class={`whitespace-pre-wrap leading-normal ${
                line.type === 'system'
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : ''
              } ${
                line.type === 'muted'
                  ? 'text-muted/60'
                  : ''
              } ${
                line.type === 'user'
                  ? 'font-semibold text-fg'
                  : ''
              } ${
                line.type === 'success'
                  ? 'font-medium text-emerald-600 dark:text-emerald-400'
                  : ''
              } ${
                line.type === 'error'
                  ? 'font-medium text-rose-600 dark:text-rose-400'
                  : ''
              }`}
            >
              {line.text}
            </p>
          {/each}
        </div>

        <div class="relative flex items-center gap-2 border-t border-line/50 pt-2">
          <span class="font-bold text-accent select-none">➜</span>
          <span class="font-medium text-blue-600 dark:text-sky-500 select-none">
            ~
          </span>

          <input
            type="text"
            bind:value={commandInput}
            onkeydown={(event) => {
              if (event.key === 'Enter') {
                executeCommand();
              }
            }}
            class="m-0 flex-1 border-none bg-transparent p-0 font-medium text-fg caret-accent outline-none focus:ring-0"
            placeholder="Type 'help' or 'projects'..."
            spellcheck="false"
            autocomplete="off"
          />

          <button
            type="button"
            onclick={() => {
              commandInput = 'help';
              executeCommand();
            }}
            class="cursor-pointer rounded p-1 text-muted/40 transition duration-150 hover:text-accent"
            title="Show Help"
          >
            <HelpCircle size="14" />
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  :global(.scrollbar-none::-webkit-scrollbar) {
    display: none;
  }

  :global(.scrollbar-none) {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>