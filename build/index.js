var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import { json } from "@remix-run/node";

// app/lib/supabase.server.ts
import { createServerClient } from "@supabase/auth-helpers-remix";

// app/lib/env.server.ts
function getEnvVar(key) {
  let value = process.env[key];
  if (!value)
    throw new Error(`Missing environment variable: ${key}`);
  return value;
}
function getSupabaseEnvVars() {
  return {
    SUPABASE_URL: getEnvVar("NEXT_PUBLIC_SUPABASE_URL"),
    SUPABASE_ANON_KEY: getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    SUPABASE_JWT_SECRET: getEnvVar("SUPABASE_JWT_SECRET")
  };
}
function getOpenAIEnvVars() {
  return {
    OPENAI_API_KEY: getEnvVar("OPENAI_API_KEY")
  };
}

// app/lib/supabase.server.ts
var { SUPABASE_URL, SUPABASE_ANON_KEY } = getSupabaseEnvVars();
function createSupabaseServerClient({
  request,
  response
}) {
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    request,
    response
  });
}

// app/components/ui/toast.tsx
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

// app/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// app/components/ui/toast.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var ToastProvider = ToastPrimitives.Provider, ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
var toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), Toast = React.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx2(
  ToastPrimitives.Root,
  {
    ref,
    className: cn(toastVariants({ variant }), className),
    ...props
  }
));
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
var ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx2(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// app/components/ui/use-toast.ts
import * as React2 from "react";
var TOAST_LIMIT = 1, TOAST_REMOVE_DELAY = 1e6;
var count = 0;
function genId() {
  return count = (count + 1) % Number.MAX_VALUE, count.toString();
}
var toastTimeouts = /* @__PURE__ */ new Map(), addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId))
    return;
  let timeout = setTimeout(() => {
    toastTimeouts.delete(toastId), dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
}, reducer = (state, action12) => {
  switch (action12.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action12.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action12.toast.id ? { ...t, ...action12.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      let { toastId } = action12;
      return toastId ? addToRemoveQueue(toastId) : state.toasts.forEach((toast2) => {
        addToRemoveQueue(toast2.id);
      }), {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: !1
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      return action12.toastId === void 0 ? {
        ...state,
        toasts: []
      } : {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action12.toastId)
      };
  }
}, listeners = [], memoryState = { toasts: [] };
function dispatch(action12) {
  memoryState = reducer(memoryState, action12), listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  let id = genId(), update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  }), dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  return dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: !0,
      onOpenChange: (open) => {
        open || dismiss();
      }
    }
  }), {
    id,
    dismiss,
    update
  };
}
function useToast() {
  let [state, setState] = React2.useState(memoryState);
  return React2.useEffect(() => (listeners.push(setState), () => {
    let index = listeners.indexOf(setState);
    index > -1 && listeners.splice(index, 1);
  }), [state]), {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}

// app/components/ui/toaster.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function Toaster() {
  let { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action: action12, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx3(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx3(ToastDescription, { children: description })
        ] }),
        action12,
        /* @__PURE__ */ jsx3(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx3(ToastViewport, {})
  ] });
}

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-FOUZUSUO.css";

// app/root.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var links = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  // {
  //   rel: "stylesheet",
  //   href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  // },
  {
    rel: "stylesheet",
    href: tailwind_default
  }
], loader = async ({ request }) => {
  let response = new Response(), supabase = createSupabaseServerClient({ request, response }), {
    data: { session }
  } = await supabase.auth.getSession();
  return json(
    {
      env: {
        SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      },
      session
    },
    {
      headers: response.headers
    }
  );
};
function App() {
  let { env } = useLoaderData();
  return /* @__PURE__ */ jsxs2("html", { lang: "en", suppressHydrationWarning: !0, children: [
    /* @__PURE__ */ jsxs2("head", { children: [
      /* @__PURE__ */ jsx4("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx4("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx4(Meta, {}),
      /* @__PURE__ */ jsx4(Links, {})
    ] }),
    /* @__PURE__ */ jsxs2("body", { children: [
      /* @__PURE__ */ jsx4(Outlet, {}),
      /* @__PURE__ */ jsx4("div", { id: "toast-root", children: /* @__PURE__ */ jsx4(Toaster, {}) }),
      /* @__PURE__ */ jsx4(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `window.env = ${JSON.stringify(env)}`
          }
        }
      ),
      /* @__PURE__ */ jsx4(ScrollRestoration, {}),
      /* @__PURE__ */ jsx4(Scripts, {}),
      /* @__PURE__ */ jsx4(LiveReload, {})
    ] })
  ] });
}

// app/routes/api.documents.analytics.tsx
var api_documents_analytics_exports = {};
__export(api_documents_analytics_exports, {
  action: () => action,
  loader: () => loader2
});
import { json as json2 } from "@remix-run/node";

// app/lib/auth.server.ts
import { redirect } from "@remix-run/node";
async function requireAuth(request) {
  let response = new Response(), supabase = createSupabaseServerClient({ request, response }), {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session)
    throw redirect("/auth/login", {
      headers: response.headers
    });
  return { session, response, supabase };
}

// app/routes/api.documents.analytics.tsx
var loader2 = async ({ request }) => {
  let { supabase, response } = await requireAuth(request), documentId = new URL(request.url).searchParams.get("documentId");
  if (!documentId)
    return json2({ error: "Document ID is required" }, { status: 400 });
  let { data: analytics, error } = await supabase.from("document_analytics").select("*").eq("document_id", documentId).order("created_at", { ascending: !1 });
  return error ? json2({ error: error.message }, { status: 400 }) : json2({ analytics }, { headers: response.headers });
}, action = async ({ request }) => {
  let { supabase, session, response } = await requireAuth(request), formData = await request.formData(), documentId = formData.get("documentId"), action12 = formData.get("action"), metadata = formData.get("metadata"), { error } = await supabase.from("document_analytics").insert([
    {
      document_id: documentId,
      user_id: session.user.id,
      action: action12,
      metadata: metadata ? JSON.parse(metadata) : {}
    }
  ]);
  return error ? json2({ error: error.message }, { status: 400 }) : json2({ success: !0 }, { headers: response.headers });
};

// app/routes/api.documents.versions.tsx
var api_documents_versions_exports = {};
__export(api_documents_versions_exports, {
  action: () => action2,
  loader: () => loader3
});
import { json as json3 } from "@remix-run/node";
var loader3 = async ({ request }) => {
  let { supabase, response } = await requireAuth(request), documentId = new URL(request.url).searchParams.get("documentId");
  if (!documentId)
    return json3({ error: "Document ID is required" }, { status: 400 });
  let { data: versions2, error } = await supabase.from("document_versions").select("*").eq("document_id", documentId).order("version", { ascending: !1 });
  return error ? json3({ error: error.message }, { status: 400 }) : json3({ versions: versions2 }, { headers: response.headers });
}, action2 = async ({ request }) => {
  let { supabase, session, response } = await requireAuth(request), formData = await request.formData(), documentId = formData.get("documentId"), title = formData.get("title"), content = formData.get("content"), emoji = formData.get("emoji"), version = parseInt(formData.get("version")), { error } = await supabase.from("document_versions").insert([
    {
      document_id: documentId,
      title,
      content: content ? JSON.parse(content) : {},
      emoji,
      version,
      user_id: session.user.id
    }
  ]);
  return error ? json3({ error: error.message }, { status: 400 }) : json3({ success: !0 }, { headers: response.headers });
};

// app/routes/api.documents.archive.tsx
var api_documents_archive_exports = {};
__export(api_documents_archive_exports, {
  action: () => action3
});
import { json as json4 } from "@remix-run/node";
var action3 = async ({ request }) => {
  let { supabase, response } = await requireAuth(request), id = (await request.formData()).get("id"), { error } = await supabase.from("documents").update({
    is_archived: !0,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", id);
  return error ? json4({ error: error.message }, { status: 400 }) : json4({ success: !0 }, { headers: response.headers });
};

// app/routes/api.workspaces.create.tsx
var api_workspaces_create_exports = {};
__export(api_workspaces_create_exports, {
  action: () => action4
});
import { json as json5 } from "@remix-run/node";
var action4 = async ({ request }) => {
  let { supabase, session, response } = await requireAuth(request), formData = await request.formData(), name = formData.get("name"), emoji = formData.get("emoji"), { data: data3, error } = await supabase.from("workspaces").insert([
    {
      name,
      emoji,
      user_id: session.user.id
    }
  ]).select().single();
  return error ? json5({ error: error.message }, { status: 400 }) : json5({ workspace: data3 }, { headers: response.headers });
};

// app/routes/api.documents.create.tsx
var api_documents_create_exports = {};
__export(api_documents_create_exports, {
  action: () => action5
});
import { json as json6 } from "@remix-run/node";
var action5 = async ({ request }) => {
  let { supabase, session, response } = await requireAuth(request), formData = await request.formData(), title = formData.get("title"), content = formData.get("content"), workspaceId = formData.get("workspace_id"), emoji = formData.get("emoji"), { data: data3, error } = await supabase.from("documents").insert([
    {
      title,
      content: content ? JSON.parse(content) : {},
      workspace_id: workspaceId,
      emoji,
      user_id: session.user.id,
      version: 1
    }
  ]).select().single();
  return error ? json6({ error: error.message }, { status: 400 }) : json6({ document: data3 }, { headers: response.headers });
};

// app/routes/api.documents.update.tsx
var api_documents_update_exports = {};
__export(api_documents_update_exports, {
  action: () => action6
});
import { json as json7 } from "@remix-run/node";
var action6 = async ({ request }) => {
  let { supabase, response } = await requireAuth(request), formData = await request.formData(), id = formData.get("id"), title = formData.get("title"), content = formData.get("content"), emoji = formData.get("emoji"), { data: currentDoc } = await supabase.from("documents").select("version").eq("id", id).single(), { data: data3, error } = await supabase.from("documents").update({
    title,
    content: content ? JSON.parse(content) : {},
    emoji,
    version: (currentDoc?.version || 0) + 1,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", id).select().single();
  return error ? json7({ error: error.message }, { status: 400 }) : json7({ document: data3 }, { headers: response.headers });
};

// app/routes/api.documents.share.tsx
var api_documents_share_exports = {};
__export(api_documents_share_exports, {
  action: () => action7,
  loader: () => loader4
});
import { json as json8 } from "@remix-run/node";
var loader4 = async ({ request }) => {
  let { supabase, response } = await requireAuth(request), documentId = new URL(request.url).searchParams.get("documentId");
  if (!documentId)
    return json8({ error: "Document ID is required" }, { status: 400 });
  let { data: shares, error } = await supabase.from("document_shares").select("*, users(name, email, avatar_url)").eq("document_id", documentId);
  return error ? json8({ error: error.message }, { status: 400 }) : json8({ shares }, { headers: response.headers });
}, action7 = async ({ request }) => {
  let { supabase, response } = await requireAuth(request), formData = await request.formData(), documentId = formData.get("documentId"), email = formData.get("email"), permission = formData.get("permission"), { data: user } = await supabase.from("users").select("id").eq("email", email).single(), { error } = await supabase.from("document_shares").insert([
    {
      document_id: documentId,
      user_id: user?.id,
      email: user?.id ? null : email,
      // Store email only if user doesn't exist
      permission
    }
  ]);
  return error ? json8({ error: error.message }, { status: 400 }) : json8({ success: !0 }, { headers: response.headers });
};

// app/routes/getting-started.tsx
var getting_started_exports = {};
__export(getting_started_exports, {
  default: () => GettingStarted,
  loader: () => loader5
});
import { json as json9 } from "@remix-run/node";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import ReactMarkdown from "react-markdown";

// app/hooks/use-page-titles.tsx
import * as React3 from "react";
var pageTitles = {}, listeners2 = /* @__PURE__ */ new Set();
function usePageTitles() {
  let [titles, setTitles] = React3.useState(pageTitles);
  React3.useEffect(() => {
    let updateTitles = () => {
      setTitles({ ...pageTitles });
    };
    return listeners2.add(updateTitles), () => {
      listeners2.delete(updateTitles);
    };
  }, []);
  let setPageTitle = React3.useCallback((id, title) => {
    pageTitles[id] = title, listeners2.forEach((listener) => listener());
  }, []), getPageTitle = React3.useCallback((id, defaultTitle) => titles[id] || defaultTitle, [titles]);
  return {
    setPageTitle,
    getPageTitle
  };
}

// app/hooks/use-page-title.tsx
function usePageTitle(id) {
  let { getPageTitle, setPageTitle } = usePageTitles();
  return {
    title: getPageTitle(id, "Untitled Page"),
    setTitle: (newTitle) => setPageTitle(id, newTitle)
  };
}

// app/hooks/use-page-emoji.tsx
import * as React4 from "react";
var pageEmojis = {}, listeners3 = /* @__PURE__ */ new Set();
function usePageEmoji(id) {
  let [emoji, setEmojiState] = React4.useState(pageEmojis[id] || "\u{1F4C4}");
  React4.useEffect(() => {
    let updateEmoji = () => {
      setEmojiState(pageEmojis[id] || "\u{1F4C4}");
    };
    return listeners3.add(updateEmoji), () => {
      listeners3.delete(updateEmoji);
    };
  }, [id]);
  let setEmoji = React4.useCallback((newEmoji) => {
    pageEmojis[id] = newEmoji, listeners3.forEach((listener) => listener());
  }, [id]), getEmoji = React4.useCallback((pageId) => pageEmojis[pageId] || "\u{1F4C4}", []);
  return {
    emoji,
    setEmoji,
    getEmoji
  };
}

// app/components/nav-favorites.tsx
import {
  ArrowUpRight,
  BookmarkX,
  Link,
  MoreHorizontal,
  Trash2
} from "lucide-react";
import { Link as RemixLink } from "@remix-run/react";

// app/components/ui/dropdown-menu.tsx
import * as React5 from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var DropdownMenu = DropdownMenuPrimitive.Root, DropdownMenuTrigger = DropdownMenuPrimitive.Trigger, DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuSubTrigger = React5.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs3(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx5(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx5(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React5.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx5(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx5(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React5.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx5(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React5.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs3(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx5("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx5(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx5(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React5.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs3(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx5("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx5(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx5(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React5.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx5(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx5(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx5(
  "span",
  {
    className: cn("ml-auto text-xs tracking-widest opacity-60", className),
    ...props
  }
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// app/components/ui/sidebar.tsx
import * as React12 from "react";
import { Slot as Slot2 } from "@radix-ui/react-slot";
import { cva as cva4 } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

// app/hooks/use-mobile.tsx
import * as React6 from "react";
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  let [isMobile, setIsMobile] = React6.useState(void 0);
  return React6.useEffect(() => {
    let mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`), onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    return mql.addEventListener("change", onChange), setIsMobile(window.innerWidth < MOBILE_BREAKPOINT), () => mql.removeEventListener("change", onChange);
  }, []), !!isMobile;
}

// app/components/ui/button.tsx
import * as React7 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx6 } from "react/jsx-runtime";
var buttonVariants = cva2(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Button = React7.forwardRef(
  ({ className, variant, size, asChild = !1, ...props }, ref) => /* @__PURE__ */ jsx6(
    asChild ? Slot : "button",
    {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props
    }
  )
);
Button.displayName = "Button";

// app/components/ui/input.tsx
import * as React8 from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var Input = React8.forwardRef(
  ({ className, type, ...props }, ref) => /* @__PURE__ */ jsx7(
    "input",
    {
      type,
      className: cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    }
  )
);
Input.displayName = "Input";

// app/components/ui/separator.tsx
import * as React9 from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { jsx as jsx8 } from "react/jsx-runtime";
var Separator2 = React9.forwardRef(
  ({ className, orientation = "horizontal", decorative = !0, ...props }, ref) => /* @__PURE__ */ jsx8(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator2.displayName = SeparatorPrimitive.Root.displayName;

// app/components/ui/sheet.tsx
import * as React10 from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva as cva3 } from "class-variance-authority";
import { X as X2 } from "lucide-react";
import { jsx as jsx9, jsxs as jsxs4 } from "react/jsx-runtime";
var Sheet = SheetPrimitive.Root;
var SheetPortal = SheetPrimitive.Portal, SheetOverlay = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx9(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
var sheetVariants = cva3(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
), SheetContent = React10.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs4(SheetPortal, { children: [
  /* @__PURE__ */ jsx9(SheetOverlay, {}),
  /* @__PURE__ */ jsxs4(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        /* @__PURE__ */ jsxs4(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsx9(X2, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx9("span", { className: "sr-only", children: "Close" })
        ] }),
        children
      ]
    }
  )
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx9(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx9(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx9(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx9(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

// app/components/ui/skeleton.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx10(
    "div",
    {
      className: cn("animate-pulse rounded-md bg-primary/10", className),
      ...props
    }
  );
}

// app/components/ui/tooltip.tsx
import * as React11 from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { jsx as jsx11 } from "react/jsx-runtime";
var TooltipProvider = TooltipPrimitive.Provider, Tooltip = TooltipPrimitive.Root, TooltipTrigger = TooltipPrimitive.Trigger, TooltipContent = React11.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx11(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx11(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// app/components/ui/sidebar.tsx
import { jsx as jsx12, jsxs as jsxs5 } from "react/jsx-runtime";
var SIDEBAR_COOKIE_NAME = "sidebar:state", SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7, SIDEBAR_WIDTH = "16rem", SIDEBAR_WIDTH_MOBILE = "18rem", SIDEBAR_WIDTH_ICON = "3rem", SIDEBAR_KEYBOARD_SHORTCUT = "b", SidebarContext = React12.createContext(null);
function useSidebar() {
  let context = React12.useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
}
var SidebarProvider = React12.forwardRef(
  ({
    defaultOpen = !0,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...props
  }, ref) => {
    let isMobile = useIsMobile(), [openMobile, setOpenMobile] = React12.useState(!1), [_open, _setOpen] = React12.useState(defaultOpen), open = openProp ?? _open, setOpen = React12.useCallback(
      (value) => {
        let openState = typeof value == "function" ? value(open) : value;
        setOpenProp ? setOpenProp(openState) : _setOpen(openState), document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    ), toggleSidebar = React12.useCallback(() => isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2), [isMobile, setOpen, setOpenMobile]);
    React12.useEffect(() => {
      let handleKeyDown = (event) => {
        event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey) && (event.preventDefault(), toggleSidebar());
      };
      return window.addEventListener("keydown", handleKeyDown), () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);
    let state = open ? "expanded" : "collapsed", contextValue = React12.useMemo(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );
    return /* @__PURE__ */ jsx12(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx12(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx12(
      "div",
      {
        style: {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style
        },
        className: cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
          className
        ),
        ref,
        ...props,
        children
      }
    ) }) });
  }
);
SidebarProvider.displayName = "SidebarProvider";
var Sidebar = React12.forwardRef(
  ({
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ...props
  }, ref) => {
    let { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    return collapsible === "none" ? /* @__PURE__ */ jsx12(
      "div",
      {
        className: cn(
          "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
          className
        ),
        ref,
        ...props,
        children
      }
    ) : isMobile ? /* @__PURE__ */ jsx12(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsx12(
      SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-mobile": "true",
        className: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: /* @__PURE__ */ jsx12("div", { className: "flex h-full w-full flex-col", children })
      }
    ) }) : /* @__PURE__ */ jsxs5(
      "div",
      {
        ref,
        className: "group peer hidden md:block text-sidebar-foreground",
        "data-state": state,
        "data-collapsible": state === "collapsed" ? collapsible : "",
        "data-variant": variant,
        "data-side": side,
        children: [
          /* @__PURE__ */ jsx12(
            "div",
            {
              className: cn(
                "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
                "group-data-[collapsible=offcanvas]:w-0",
                "group-data-[side=right]:rotate-180",
                variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
              )
            }
          ),
          /* @__PURE__ */ jsx12(
            "div",
            {
              className: cn(
                "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
                side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                // Adjust the padding for floating and inset variants.
                variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
                className
              ),
              ...props,
              children: /* @__PURE__ */ jsx12(
                "div",
                {
                  "data-sidebar": "sidebar",
                  className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
                  children
                }
              )
            }
          )
        ]
      }
    );
  }
);
Sidebar.displayName = "Sidebar";
var SidebarTrigger = React12.forwardRef(({ className, onClick, ...props }, ref) => {
  let { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxs5(
    Button,
    {
      ref,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: cn("h-7 w-7", className),
      onClick: (event) => {
        onClick?.(event), toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx12(PanelLeft, {}),
        /* @__PURE__ */ jsx12("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
var SidebarRail = React12.forwardRef(({ className, ...props }, ref) => {
  let { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsx12(
    "button",
    {
      ref,
      "data-sidebar": "rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      ),
      ...props
    }
  );
});
SidebarRail.displayName = "SidebarRail";
var SidebarInset = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx12(
  "main",
  {
    ref,
    className: cn(
      "relative flex min-h-svh flex-1 flex-col bg-background",
      "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
      className
    ),
    ...props
  }
));
SidebarInset.displayName = "SidebarInset";
var SidebarInput = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx12(
  Input,
  {
    ref,
    "data-sidebar": "input",
    className: cn(
      "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
      className
    ),
    ...props
  }
));
SidebarInput.displayName = "SidebarInput";
var SidebarHeader = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx12(
  "div",
  {
    ref,
    "data-sidebar": "header",
    className: cn("flex flex-col gap-2 p-2", className),
    ...props
  }
));
SidebarHeader.displayName = "SidebarHeader";
var SidebarFooter = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx12(
  "div",
  {
    ref,
    "data-sidebar": "footer",
    className: cn("flex flex-col gap-2 p-2", className),
    ...props
  }
));
SidebarFooter.displayName = "SidebarFooter";
var SidebarSeparator = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx12(
  Separator2,
  {
    ref,
    "data-sidebar": "separator",
    className: cn("mx-2 w-auto bg-sidebar-border", className),
    ...props
  }
));
SidebarSeparator.displayName = "SidebarSeparator";
var SidebarContent = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx12(
  "div",
  {
    ref,
    "data-sidebar": "content",
    className: cn(
      "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
      className
    ),
    ...props
  }
));
SidebarContent.displayName = "SidebarContent";
var SidebarGroup = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx12(
  "div",
  {
    ref,
    "data-sidebar": "group",
    className: cn("relative flex w-full min-w-0 flex-col p-2", className),
    ...props
  }
));
SidebarGroup.displayName = "SidebarGroup";
var SidebarGroupLabel = React12.forwardRef(({ className, asChild = !1, ...props }, ref) => /* @__PURE__ */ jsx12(
  asChild ? Slot2 : "div",
  {
    ref,
    "data-sidebar": "group-label",
    className: cn(
      "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
      "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
      className
    ),
    ...props
  }
));
SidebarGroupLabel.displayName = "SidebarGroupLabel";
var SidebarGroupAction = React12.forwardRef(({ className, asChild = !1, ...props }, ref) => /* @__PURE__ */ jsx12(
  asChild ? Slot2 : "button",
  {
    ref,
    "data-sidebar": "group-action",
    className: cn(
      "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
      // Increases the hit area of the button on mobile.
      "after:absolute after:-inset-2 after:md:hidden",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    ...props
  }
));
SidebarGroupAction.displayName = "SidebarGroupAction";
var SidebarGroupContent = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx12(
  "div",
  {
    ref,
    "data-sidebar": "group-content",
    className: cn("w-full text-sm", className),
    ...props
  }
));
SidebarGroupContent.displayName = "SidebarGroupContent";
var SidebarMenu = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx12(
  "ul",
  {
    ref,
    "data-sidebar": "menu",
    className: cn("flex w-full min-w-0 flex-col gap-1", className),
    ...props
  }
));
SidebarMenu.displayName = "SidebarMenu";
var SidebarMenuItem = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx12(
  "li",
  {
    ref,
    "data-sidebar": "menu-item",
    className: cn("group/menu-item relative", className),
    ...props
  }
));
SidebarMenuItem.displayName = "SidebarMenuItem";
var sidebarMenuButtonVariants = cva4(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), SidebarMenuButton = React12.forwardRef(
  ({
    asChild = !1,
    isActive = !1,
    variant = "default",
    size = "default",
    tooltip,
    className,
    ...props
  }, ref) => {
    let Comp = asChild ? Slot2 : "button", { isMobile, state } = useSidebar(), button = /* @__PURE__ */ jsx12(
      Comp,
      {
        ref,
        "data-sidebar": "menu-button",
        "data-size": size,
        "data-active": isActive,
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
        ...props
      }
    );
    return tooltip ? (typeof tooltip == "string" && (tooltip = {
      children: tooltip
    }), /* @__PURE__ */ jsxs5(Tooltip, { children: [
      /* @__PURE__ */ jsx12(TooltipTrigger, { asChild: !0, children: button }),
      /* @__PURE__ */ jsx12(
        TooltipContent,
        {
          side: "right",
          align: "center",
          hidden: state !== "collapsed" || isMobile,
          ...tooltip
        }
      )
    ] })) : button;
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";
var SidebarMenuAction = React12.forwardRef(({ className, asChild = !1, showOnHover = !1, ...props }, ref) => /* @__PURE__ */ jsx12(
  asChild ? Slot2 : "button",
  {
    ref,
    "data-sidebar": "menu-action",
    className: cn(
      "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
      // Increases the hit area of the button on mobile.
      "after:absolute after:-inset-2 after:md:hidden",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
      className
    ),
    ...props
  }
));
SidebarMenuAction.displayName = "SidebarMenuAction";
var SidebarMenuBadge = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx12(
  "div",
  {
    ref,
    "data-sidebar": "menu-badge",
    className: cn(
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    ...props
  }
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";
var SidebarMenuSkeleton = React12.forwardRef(({ className, showIcon = !1, ...props }, ref) => {
  let width = React12.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      ref,
      "data-sidebar": "menu-skeleton",
      className: cn("rounded-md h-8 flex gap-2 px-2 items-center", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ jsx12(
          Skeleton,
          {
            className: "size-4 rounded-md",
            "data-sidebar": "menu-skeleton-icon"
          }
        ),
        /* @__PURE__ */ jsx12(
          Skeleton,
          {
            className: "h-4 flex-1 max-w-[--skeleton-width]",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          }
        )
      ]
    }
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
var SidebarMenuSub = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx12(
  "ul",
  {
    ref,
    "data-sidebar": "menu-sub",
    className: cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    ...props
  }
));
SidebarMenuSub.displayName = "SidebarMenuSub";
var SidebarMenuSubItem = React12.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx12("li", { ref, ...props }));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
var SidebarMenuSubButton = React12.forwardRef(({ asChild = !1, size = "md", isActive, className, ...props }, ref) => /* @__PURE__ */ jsx12(
  asChild ? Slot2 : "a",
  {
    ref,
    "data-sidebar": "menu-sub-button",
    "data-size": size,
    "data-active": isActive,
    className: cn(
      "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
      "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
      size === "sm" && "text-xs",
      size === "md" && "text-sm",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    ...props
  }
));
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

// app/hooks/use-bookmarks.tsx
import * as React13 from "react";
var bookmarks = [], listeners4 = /* @__PURE__ */ new Set();
function useBookmarks() {
  let [items2, setItems] = React13.useState(bookmarks), { getPageTitle } = usePageTitles(), { getEmoji } = usePageEmoji();
  React13.useEffect(() => {
    let updateBookmarks = () => {
      bookmarks.forEach((bookmark) => {
        bookmark.name = getPageTitle(bookmark.id, bookmark.name), bookmark.emoji = getEmoji(bookmark.id) || bookmark.emoji;
      }), setItems([...bookmarks]);
    };
    return listeners4.add(updateBookmarks), updateBookmarks(), () => {
      listeners4.delete(updateBookmarks);
    };
  }, [getPageTitle, getEmoji]);
  let addBookmark = React13.useCallback((id) => {
    let title = getPageTitle(id, "Untitled"), emoji = getEmoji(id) || "\u{1F4C4}", bookmark = {
      id,
      name: title,
      emoji,
      url: `/pages/${id}`
    }, existingIndex = bookmarks.findIndex((b) => b.id === id);
    existingIndex === -1 ? bookmarks.push(bookmark) : bookmarks[existingIndex] = bookmark, setItems([...bookmarks]), listeners4.forEach((listener) => listener());
  }, [getPageTitle, getEmoji]), removeBookmark = React13.useCallback((id) => {
    let index = bookmarks.findIndex((b) => b.id === id);
    index !== -1 && (bookmarks.splice(index, 1), setItems([...bookmarks]), listeners4.forEach((listener) => listener()));
  }, []), isBookmarked = React13.useCallback((id) => bookmarks.some((b) => b.id === id), []);
  return {
    bookmarks: items2,
    addBookmark,
    removeBookmark,
    isBookmarked
  };
}

// app/components/nav-favorites.tsx
import { jsx as jsx13, jsxs as jsxs6 } from "react/jsx-runtime";
function NavFavorites() {
  let { isMobile } = useSidebar(), { bookmarks: bookmarks2, removeBookmark } = useBookmarks(), { getEmoji } = usePageEmoji(""), sortedBookmarks = [...bookmarks2].sort(
    (a, b) => a.name.localeCompare(b.name)
  );
  return /* @__PURE__ */ jsxs6(SidebarGroup, { className: "group-data-[collapsible=icon]:hidden", children: [
    /* @__PURE__ */ jsx13(SidebarGroupLabel, { children: "Bookmarks" }),
    /* @__PURE__ */ jsx13(SidebarGroupContent, { children: /* @__PURE__ */ jsx13(SidebarMenu, { children: sortedBookmarks.map((item) => /* @__PURE__ */ jsxs6(SidebarMenuItem, { children: [
      /* @__PURE__ */ jsx13(SidebarMenuButton, { asChild: !0, children: /* @__PURE__ */ jsxs6(RemixLink, { to: item.url, children: [
        /* @__PURE__ */ jsx13("span", { children: getEmoji(item.id) }),
        /* @__PURE__ */ jsx13("span", { children: item.name })
      ] }) }),
      /* @__PURE__ */ jsxs6(DropdownMenu, { children: [
        /* @__PURE__ */ jsx13(DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ jsxs6(SidebarMenuAction, { showOnHover: !0, children: [
          /* @__PURE__ */ jsx13(MoreHorizontal, {}),
          /* @__PURE__ */ jsx13("span", { className: "sr-only", children: "More" })
        ] }) }),
        /* @__PURE__ */ jsxs6(
          DropdownMenuContent,
          {
            align: isMobile ? "center" : "start",
            className: "w-48",
            children: [
              /* @__PURE__ */ jsxs6(DropdownMenuItem, { onClick: () => removeBookmark(item.id), children: [
                /* @__PURE__ */ jsx13(BookmarkX, { className: "text-muted-foreground" }),
                /* @__PURE__ */ jsx13("span", { children: "Remove from Bookmarks" })
              ] }),
              /* @__PURE__ */ jsx13(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsx13(DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ jsxs6(RemixLink, { to: item.url, children: [
                /* @__PURE__ */ jsx13(Link, { className: "text-muted-foreground" }),
                /* @__PURE__ */ jsx13("span", { children: "Copy Link" })
              ] }) }),
              /* @__PURE__ */ jsx13(DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ jsxs6("a", { href: item.url, target: "_blank", rel: "noopener noreferrer", children: [
                /* @__PURE__ */ jsx13(ArrowUpRight, { className: "text-muted-foreground" }),
                /* @__PURE__ */ jsx13("span", { children: "Open in New Tab" })
              ] }) }),
              /* @__PURE__ */ jsx13(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsxs6(DropdownMenuItem, { className: "text-destructive focus:text-destructive", children: [
                /* @__PURE__ */ jsx13(Trash2, { className: "text-muted-foreground" }),
                /* @__PURE__ */ jsx13("span", { children: "Delete" })
              ] })
            ]
          }
        )
      ] })
    ] }, item.id)) }) })
  ] });
}

// app/components/nav-main.tsx
import * as React19 from "react";
import { Link as Link2, useLocation } from "@remix-run/react";
import { Archive as Archive2, Home, Search as Search3, Settings as Settings2, Sparkles } from "lucide-react";

// app/components/archive-command.tsx
import * as React15 from "react";
import {
  Archive,
  ArrowUpRight as ArrowUpRight2,
  Clock,
  FileText,
  Folder,
  MoreHorizontal as MoreHorizontal2,
  Search,
  Star,
  Tags,
  Trash2 as Trash22
} from "lucide-react";

// app/components/ui/dialog.tsx
import * as React14 from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X as X3 } from "lucide-react";
import { jsx as jsx14, jsxs as jsxs7 } from "react/jsx-runtime";
var Dialog = DialogPrimitive.Root;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React14.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx14(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React14.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs7(DialogPortal, { children: [
  /* @__PURE__ */ jsx14(DialogOverlay, {}),
  /* @__PURE__ */ jsxs7(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs7(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx14(X3, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx14("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx14(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx14(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React14.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx14(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React14.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx14(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// app/components/archive-command.tsx
import { jsx as jsx15, jsxs as jsxs8 } from "react/jsx-runtime";
var archivedItems = [
  {
    id: 1,
    name: "Project Documentation",
    type: "document",
    date: "2024-03-10",
    icon: FileText,
    tags: ["Important", "Work"]
  },
  {
    id: 2,
    name: "Design Assets",
    type: "folder",
    date: "2024-03-09",
    icon: Folder,
    tags: ["Design", "Assets"]
  },
  {
    id: 3,
    name: "Meeting Notes",
    type: "document",
    date: "2024-03-08",
    icon: FileText,
    tags: ["Work", "Notes"]
  },
  {
    id: 4,
    name: "Research Papers",
    type: "folder",
    date: "2024-03-07",
    icon: Folder,
    tags: ["Research"]
  },
  {
    id: 5,
    name: "Product Roadmap",
    type: "document",
    date: "2024-03-06",
    icon: FileText,
    tags: ["Product", "Planning"]
  }
], filters = [
  { id: "all", name: "All Items", icon: Archive },
  { id: "recent", name: "Recent", icon: Clock },
  { id: "starred", name: "Starred", icon: Star },
  { id: "trash", name: "Trash", icon: Trash22 }
];
function ArchiveCommand({ open, onOpenChange }) {
  let [activeFilter, setActiveFilter] = React15.useState("all"), [searchQuery, setSearchQuery] = React15.useState("");
  React15.useEffect(() => {
    let down = (e) => {
      e.key === "a" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), onOpenChange?.(!open));
    };
    return document.addEventListener("keydown", down), () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);
  let filteredItems = archivedItems.filter(
    (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())
  ), activeTitle = filters.find((f) => f.id === activeFilter)?.name || "Archive";
  return /* @__PURE__ */ jsx15(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs8(DialogContent, { className: "max-w-4xl h-[85vh] p-0", children: [
    /* @__PURE__ */ jsx15(DialogHeader, { className: "sr-only", children: /* @__PURE__ */ jsx15(DialogTitle, { children: activeTitle }) }),
    /* @__PURE__ */ jsxs8("div", { className: "flex h-full", children: [
      /* @__PURE__ */ jsxs8("div", { className: "w-64 border-r p-4 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs8("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx15(Archive, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx15("h2", { className: "text-lg font-semibold", children: "Archive" })
          ] }),
          /* @__PURE__ */ jsxs8("div", { className: "relative", children: [
            /* @__PURE__ */ jsx15(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx15(
              Input,
              {
                placeholder: "Search archives...",
                className: "pl-8",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx15(Separator2, {}),
        /* @__PURE__ */ jsx15("nav", { className: "space-y-1", children: filters.map((filter) => {
          let Icon = filter.icon;
          return /* @__PURE__ */ jsxs8(
            "button",
            {
              onClick: () => setActiveFilter(filter.id),
              className: `w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg transition-colors ${activeFilter === filter.id ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-secondary/50"}`,
              children: [
                /* @__PURE__ */ jsx15(Icon, { className: "h-4 w-4" }),
                filter.name
              ]
            },
            filter.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs8("div", { className: "flex-1 flex flex-col min-h-0", children: [
        /* @__PURE__ */ jsx15("div", { className: "border-b p-4", children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx15("h3", { className: "text-sm font-medium", children: activeFilter === "all" ? "All Archives" : filters.find((f) => f.id === activeFilter)?.name }),
          /* @__PURE__ */ jsxs8(Button, { variant: "outline", size: "sm", children: [
            /* @__PURE__ */ jsx15(Tags, { className: "h-4 w-4 mr-2" }),
            "Manage Tags"
          ] })
        ] }) }),
        /* @__PURE__ */ jsx15("div", { className: "p-4 overflow-auto flex-1", children: /* @__PURE__ */ jsx15("div", { className: "grid gap-2", children: filteredItems.length === 0 ? /* @__PURE__ */ jsxs8("div", { className: "text-center py-12", children: [
          /* @__PURE__ */ jsx15(Archive, { className: "h-12 w-12 mx-auto text-muted-foreground" }),
          /* @__PURE__ */ jsx15("h3", { className: "mt-4 text-lg font-medium", children: "No items found" }),
          /* @__PURE__ */ jsx15("p", { className: "text-sm text-muted-foreground", children: "Try adjusting your search or filters" })
        ] }) : filteredItems.map((item) => {
          let Icon = item.icon;
          return /* @__PURE__ */ jsxs8(
            "div",
            {
              className: "flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors",
              children: [
                /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx15(Icon, { className: "h-5 w-5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxs8("div", { children: [
                    /* @__PURE__ */ jsx15("h4", { className: "text-sm font-medium", children: item.name }),
                    /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-2 mt-1", children: [
                      /* @__PURE__ */ jsx15("span", { className: "text-xs text-muted-foreground", children: item.date }),
                      /* @__PURE__ */ jsx15("span", { className: "text-xs text-muted-foreground", children: "\u2022" }),
                      /* @__PURE__ */ jsx15("div", { className: "flex items-center gap-1", children: item.tags.map((tag) => /* @__PURE__ */ jsx15(
                        "span",
                        {
                          className: "inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium bg-secondary",
                          children: tag
                        },
                        tag
                      )) })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs8(DropdownMenu, { children: [
                  /* @__PURE__ */ jsx15(DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ jsxs8(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: [
                    /* @__PURE__ */ jsx15(MoreHorizontal2, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx15("span", { className: "sr-only", children: "Open menu" })
                  ] }) }),
                  /* @__PURE__ */ jsxs8(DropdownMenuContent, { align: "end", children: [
                    /* @__PURE__ */ jsxs8(DropdownMenuItem, { children: [
                      /* @__PURE__ */ jsx15(ArrowUpRight2, { className: "h-4 w-4 mr-2" }),
                      "Open"
                    ] }),
                    /* @__PURE__ */ jsxs8(DropdownMenuItem, { children: [
                      /* @__PURE__ */ jsx15(Star, { className: "h-4 w-4 mr-2" }),
                      "Star"
                    ] }),
                    /* @__PURE__ */ jsx15(DropdownMenuSeparator, {}),
                    /* @__PURE__ */ jsxs8(DropdownMenuItem, { className: "text-destructive focus:text-destructive", children: [
                      /* @__PURE__ */ jsx15(Trash22, { className: "h-4 w-4 mr-2" }),
                      "Delete"
                    ] })
                  ] })
                ] })
              ]
            },
            item.id
          );
        }) }) })
      ] })
    ] })
  ] }) });
}

// app/components/search-command.tsx
import * as React17 from "react";
import {
  Calendar,
  CreditCard,
  FileText as FileText2,
  FolderPlus,
  Hash,
  Settings,
  Tags as Tags2,
  User
} from "lucide-react";

// app/components/ui/command.tsx
import * as React16 from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search as Search2 } from "lucide-react";
import { jsx as jsx16, jsxs as jsxs9 } from "react/jsx-runtime";
var Command = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  CommandPrimitive,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = CommandPrimitive.displayName;
var CommandDialog = ({ children, ...props }) => /* @__PURE__ */ jsx16(Dialog, { ...props, children: /* @__PURE__ */ jsx16(DialogContent, { className: "overflow-hidden p-0 shadow-lg", children: /* @__PURE__ */ jsx16(Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children }) }) }), CommandInput = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs9("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsx16(Search2, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsx16(
    CommandPrimitive.Input,
    {
      ref,
      className: cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = CommandPrimitive.Input.displayName;
var CommandList = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  CommandPrimitive.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = CommandPrimitive.List.displayName;
var CommandEmpty = React16.forwardRef((props, ref) => /* @__PURE__ */ jsx16(
  CommandPrimitive.Empty,
  {
    ref,
    className: "py-6 text-center text-sm",
    ...props
  }
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
var CommandGroup = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  CommandPrimitive.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;
var CommandSeparator = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  CommandPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
var CommandItem = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  CommandPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  }
));
CommandItem.displayName = CommandPrimitive.Item.displayName;
var CommandShortcut = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx16(
  "span",
  {
    className: cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      className
    ),
    ...props
  }
);
CommandShortcut.displayName = "CommandShortcut";

// app/components/search-command.tsx
import { jsx as jsx17, jsxs as jsxs10 } from "react/jsx-runtime";
function SearchCommand() {
  let [open, setOpen] = React17.useState(!1);
  return React17.useEffect(() => {
    let down = (e) => {
      e.key === "k" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), setOpen((open2) => !open2));
    };
    return document.addEventListener("keydown", down), () => document.removeEventListener("keydown", down);
  }, []), /* @__PURE__ */ jsxs10(CommandDialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx17(DialogTitle, { className: "sr-only", children: "Search Commands" }),
    /* @__PURE__ */ jsxs10(Command, { className: "rounded-lg border shadow-md", children: [
      /* @__PURE__ */ jsx17(CommandInput, { placeholder: "Type a command or search..." }),
      /* @__PURE__ */ jsxs10(CommandList, { children: [
        /* @__PURE__ */ jsx17(CommandEmpty, { children: "No results found." }),
        /* @__PURE__ */ jsxs10(CommandGroup, { heading: "Suggestions", children: [
          /* @__PURE__ */ jsxs10(CommandItem, { children: [
            /* @__PURE__ */ jsx17(Calendar, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsx17("span", { children: "Calendar" })
          ] }),
          /* @__PURE__ */ jsxs10(CommandItem, { children: [
            /* @__PURE__ */ jsx17(FolderPlus, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsx17("span", { children: "New Project" }),
            /* @__PURE__ */ jsx17(CommandShortcut, { children: "\u2318N" })
          ] }),
          /* @__PURE__ */ jsxs10(CommandItem, { children: [
            /* @__PURE__ */ jsx17(FileText2, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsx17("span", { children: "New Document" }),
            /* @__PURE__ */ jsx17(CommandShortcut, { children: "\u2318D" })
          ] })
        ] }),
        /* @__PURE__ */ jsx17(CommandSeparator, {}),
        /* @__PURE__ */ jsxs10(CommandGroup, { heading: "Settings", children: [
          /* @__PURE__ */ jsxs10(CommandItem, { children: [
            /* @__PURE__ */ jsx17(User, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsx17("span", { children: "Profile" }),
            /* @__PURE__ */ jsx17(CommandShortcut, { children: "\u2318P" })
          ] }),
          /* @__PURE__ */ jsxs10(CommandItem, { children: [
            /* @__PURE__ */ jsx17(CreditCard, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsx17("span", { children: "Billing" }),
            /* @__PURE__ */ jsx17(CommandShortcut, { children: "\u2318B" })
          ] }),
          /* @__PURE__ */ jsxs10(CommandItem, { children: [
            /* @__PURE__ */ jsx17(Settings, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsx17("span", { children: "Settings" }),
            /* @__PURE__ */ jsx17(CommandShortcut, { children: "\u2318S" })
          ] })
        ] }),
        /* @__PURE__ */ jsx17(CommandSeparator, {}),
        /* @__PURE__ */ jsxs10(CommandGroup, { heading: "Quick Actions", children: [
          /* @__PURE__ */ jsxs10(CommandItem, { children: [
            /* @__PURE__ */ jsx17(Hash, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsx17("span", { children: "Add Tag" }),
            /* @__PURE__ */ jsx17(CommandShortcut, { children: "\u2318T" })
          ] }),
          /* @__PURE__ */ jsxs10(CommandItem, { children: [
            /* @__PURE__ */ jsx17(Tags2, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsx17("span", { children: "Add Label" }),
            /* @__PURE__ */ jsx17(CommandShortcut, { children: "\u2318L" })
          ] })
        ] })
      ] })
    ] })
  ] });
}

// app/components/settings-command.tsx
import * as React18 from "react";
import {
  Bell,
  CircleUser,
  KeyRound,
  Settings as SettingsIcon
} from "lucide-react";

// app/components/settings/account-settings.tsx
import { jsx as jsx18, jsxs as jsxs11 } from "react/jsx-runtime";
function AccountSettings() {
  return /* @__PURE__ */ jsxs11("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs11("div", { children: [
      /* @__PURE__ */ jsx18("h3", { className: "text-lg font-medium", children: "Account Settings" }),
      /* @__PURE__ */ jsx18("p", { className: "text-sm text-muted-foreground", children: "Manage your account settings and preferences." })
    ] }),
    /* @__PURE__ */ jsx18(Separator2, {}),
    /* @__PURE__ */ jsxs11("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs11("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsx18("label", { htmlFor: "name", className: "text-sm font-medium", children: "Name" }),
        /* @__PURE__ */ jsx18(Input, { id: "name", defaultValue: "John Doe" })
      ] }),
      /* @__PURE__ */ jsxs11("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsx18("label", { htmlFor: "email", className: "text-sm font-medium", children: "Email" }),
        /* @__PURE__ */ jsx18(Input, { id: "email", type: "email", defaultValue: "john@example.com" })
      ] }),
      /* @__PURE__ */ jsx18(Button, { children: "Save Changes" })
    ] })
  ] });
}

// app/components/settings/app-settings.tsx
import { jsx as jsx19, jsxs as jsxs12 } from "react/jsx-runtime";
function AppSettings() {
  return /* @__PURE__ */ jsxs12("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs12("div", { children: [
      /* @__PURE__ */ jsx19("h3", { className: "text-lg font-medium", children: "App Settings" }),
      /* @__PURE__ */ jsx19("p", { className: "text-sm text-muted-foreground", children: "Customize your app experience." })
    ] }),
    /* @__PURE__ */ jsx19(Separator2, {}),
    /* @__PURE__ */ jsxs12("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs12("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs12("div", { children: [
          /* @__PURE__ */ jsx19("p", { className: "font-medium", children: "Dark Mode" }),
          /* @__PURE__ */ jsx19("p", { className: "text-sm text-muted-foreground", children: "Toggle dark mode on or off" })
        ] }),
        /* @__PURE__ */ jsx19(Button, { variant: "outline", children: "Toggle" })
      ] }),
      /* @__PURE__ */ jsxs12("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs12("div", { children: [
          /* @__PURE__ */ jsx19("p", { className: "font-medium", children: "Compact Mode" }),
          /* @__PURE__ */ jsx19("p", { className: "text-sm text-muted-foreground", children: "Make the UI more compact" })
        ] }),
        /* @__PURE__ */ jsx19(Button, { variant: "outline", children: "Toggle" })
      ] })
    ] })
  ] });
}

// app/components/settings/notification-settings.tsx
import { jsx as jsx20, jsxs as jsxs13 } from "react/jsx-runtime";
function NotificationSettings() {
  return /* @__PURE__ */ jsxs13("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs13("div", { children: [
      /* @__PURE__ */ jsx20("h3", { className: "text-lg font-medium", children: "Notification Settings" }),
      /* @__PURE__ */ jsx20("p", { className: "text-sm text-muted-foreground", children: "Manage how you receive notifications." })
    ] }),
    /* @__PURE__ */ jsx20(Separator2, {}),
    /* @__PURE__ */ jsxs13("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs13("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs13("div", { children: [
          /* @__PURE__ */ jsx20("p", { className: "font-medium", children: "Email Notifications" }),
          /* @__PURE__ */ jsx20("p", { className: "text-sm text-muted-foreground", children: "Receive notifications via email" })
        ] }),
        /* @__PURE__ */ jsx20(Button, { variant: "outline", children: "Enable" })
      ] }),
      /* @__PURE__ */ jsxs13("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs13("div", { children: [
          /* @__PURE__ */ jsx20("p", { className: "font-medium", children: "Push Notifications" }),
          /* @__PURE__ */ jsx20("p", { className: "text-sm text-muted-foreground", children: "Receive push notifications" })
        ] }),
        /* @__PURE__ */ jsx20(Button, { variant: "outline", children: "Enable" })
      ] })
    ] })
  ] });
}

// app/components/settings/security-settings.tsx
import { jsx as jsx21, jsxs as jsxs14 } from "react/jsx-runtime";
function SecuritySettings() {
  return /* @__PURE__ */ jsxs14("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs14("div", { children: [
      /* @__PURE__ */ jsx21("h3", { className: "text-lg font-medium", children: "Security Settings" }),
      /* @__PURE__ */ jsx21("p", { className: "text-sm text-muted-foreground", children: "Manage your security preferences." })
    ] }),
    /* @__PURE__ */ jsx21(Separator2, {}),
    /* @__PURE__ */ jsxs14("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs14("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsx21("label", { htmlFor: "current-password", className: "text-sm font-medium", children: "Current Password" }),
        /* @__PURE__ */ jsx21(Input, { id: "current-password", type: "password" })
      ] }),
      /* @__PURE__ */ jsxs14("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsx21("label", { htmlFor: "new-password", className: "text-sm font-medium", children: "New Password" }),
        /* @__PURE__ */ jsx21(Input, { id: "new-password", type: "password" })
      ] }),
      /* @__PURE__ */ jsxs14("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsx21("label", { htmlFor: "confirm-password", className: "text-sm font-medium", children: "Confirm New Password" }),
        /* @__PURE__ */ jsx21(Input, { id: "confirm-password", type: "password" })
      ] }),
      /* @__PURE__ */ jsx21(Button, { children: "Update Password" })
    ] })
  ] });
}

// app/components/settings-command.tsx
import { jsx as jsx22, jsxs as jsxs15 } from "react/jsx-runtime";
var personalSections = [
  {
    id: "account",
    label: "My Account",
    icon: CircleUser,
    component: AccountSettings
  },
  {
    id: "settings",
    label: "My Settings",
    icon: SettingsIcon,
    component: AppSettings
  },
  {
    id: "notifications",
    label: "My Notifications",
    icon: Bell,
    component: NotificationSettings
  },
  {
    id: "security",
    label: "Security & Data",
    icon: KeyRound,
    component: SecuritySettings
  }
];
function SettingsCommand({ open, onOpenChange }) {
  let [activeSection, setActiveSection] = React18.useState("account");
  React18.useEffect(() => {
    let down = (e) => {
      e.key === "s" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), onOpenChange?.(!open));
    };
    return document.addEventListener("keydown", down), () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);
  let ActiveComponent = personalSections.find((s) => s.id === activeSection)?.component || AccountSettings, activeTitle = personalSections.find((s) => s.id === activeSection)?.label || "Settings";
  return /* @__PURE__ */ jsx22(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs15(DialogContent, { className: "max-w-[1200px] h-[85vh] p-0 gap-0", children: [
    /* @__PURE__ */ jsx22(DialogHeader, { className: "sr-only", children: /* @__PURE__ */ jsx22(DialogTitle, { children: activeTitle }) }),
    /* @__PURE__ */ jsxs15("div", { className: "flex h-full overflow-hidden rounded-xl", children: [
      /* @__PURE__ */ jsx22("div", { className: "w-60 bg-muted/50 overflow-y-auto flex-shrink-0 rounded-l-xl border-r", children: /* @__PURE__ */ jsx22("div", { className: "px-2 pt-4 pb-4", children: /* @__PURE__ */ jsxs15("div", { className: "px-2", children: [
        /* @__PURE__ */ jsx22("div", { className: "text-[11px] font-semibold text-muted-foreground mb-1.5", children: "SETTINGS" }),
        /* @__PURE__ */ jsx22("nav", { className: "mt-4 space-y-0.5 px-1", children: personalSections.map((section) => {
          let Icon = section.icon;
          return /* @__PURE__ */ jsxs15(
            "button",
            {
              className: `w-full flex items-center px-2 py-1.5 h-8 text-sm font-medium rounded-lg transition-colors ${activeSection === section.id ? "bg-background text-foreground hover:bg-background" : "text-muted-foreground hover:bg-background/50 hover:text-foreground"}`,
              onClick: () => setActiveSection(section.id),
              children: [
                /* @__PURE__ */ jsx22(Icon, { className: "h-4 w-4 mr-2 shrink-0" }),
                section.label
              ]
            },
            section.id
          );
        }) })
      ] }) }) }),
      /* @__PURE__ */ jsx22("div", { className: "flex-1 min-h-0 bg-background rounded-r-xl", children: /* @__PURE__ */ jsx22("div", { className: "h-full overflow-y-auto", children: /* @__PURE__ */ jsx22("div", { className: "max-w-3xl mx-auto p-8", children: /* @__PURE__ */ jsx22(ActiveComponent, {}) }) }) })
    ] })
  ] }) });
}

// app/components/nav-main.tsx
import { Fragment, jsx as jsx23, jsxs as jsxs16 } from "react/jsx-runtime";
var items = [
  {
    title: "Search",
    url: "#",
    icon: Search3,
    isSearch: !0
  },
  {
    title: "Ask AI",
    url: "/askai",
    icon: Sparkles
  },
  {
    title: "Home",
    url: "/",
    icon: Home
  },
  {
    title: "Archive",
    url: "#",
    icon: Archive2,
    isArchive: !0
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    isSettings: !0
  }
];
function NavMain() {
  let location = useLocation(), [settingsOpen, setSettingsOpen] = React19.useState(!1), [archiveOpen, setArchiveOpen] = React19.useState(!1);
  return /* @__PURE__ */ jsxs16(Fragment, { children: [
    /* @__PURE__ */ jsx23(SearchCommand, {}),
    /* @__PURE__ */ jsx23(ArchiveCommand, { open: archiveOpen, onOpenChange: setArchiveOpen }),
    /* @__PURE__ */ jsx23(SettingsCommand, { open: settingsOpen, onOpenChange: setSettingsOpen }),
    /* @__PURE__ */ jsx23(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ jsx23(SidebarMenuItem, { children: item.isSearch ? /* @__PURE__ */ jsxs16(
      SidebarMenuButton,
      {
        onClick: () => {
          let event = new KeyboardEvent("keydown", {
            key: "k",
            metaKey: !0
          });
          document.dispatchEvent(event);
        },
        children: [
          /* @__PURE__ */ jsx23(item.icon, {}),
          /* @__PURE__ */ jsx23("span", { children: item.title })
        ]
      }
    ) : item.isArchive ? /* @__PURE__ */ jsxs16(SidebarMenuButton, { onClick: () => setArchiveOpen(!0), children: [
      /* @__PURE__ */ jsx23(item.icon, {}),
      /* @__PURE__ */ jsx23("span", { children: item.title })
    ] }) : item.isSettings ? /* @__PURE__ */ jsxs16(SidebarMenuButton, { onClick: () => setSettingsOpen(!0), children: [
      /* @__PURE__ */ jsx23(item.icon, {}),
      /* @__PURE__ */ jsx23("span", { children: item.title })
    ] }) : /* @__PURE__ */ jsx23(SidebarMenuButton, { asChild: !0, children: /* @__PURE__ */ jsxs16(
      Link2,
      {
        to: item.url,
        className: location.pathname === item.url ? "data-[active=true]" : "",
        children: [
          /* @__PURE__ */ jsx23(item.icon, {}),
          /* @__PURE__ */ jsx23("span", { children: item.title })
        ]
      }
    ) }) }, item.title)) })
  ] });
}

// app/components/nav-workspaces.tsx
import * as React24 from "react";
import { Link as Link3, useNavigate } from "@remix-run/react";
import { ChevronRight as ChevronRight2, MoreHorizontal as MoreHorizontal3, Plus } from "lucide-react";

// app/components/add-library-item.tsx
import * as React22 from "react";
import { FileUp, Globe, Upload } from "lucide-react";

// app/components/ui/label.tsx
import * as React20 from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva as cva5 } from "class-variance-authority";
import { jsx as jsx24 } from "react/jsx-runtime";
var labelVariants = cva5(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
), Label2 = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx24(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label2.displayName = LabelPrimitive.Root.displayName;

// app/components/ui/tabs.tsx
import * as React21 from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { jsx as jsx25 } from "react/jsx-runtime";
var Tabs = TabsPrimitive.Root, TabsList = React21.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx25(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React21.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx25(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React21.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx25(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// app/components/add-library-item.tsx
import { jsx as jsx26, jsxs as jsxs17 } from "react/jsx-runtime";
function AddLibraryItem({ open, onOpenChange, onAdd }) {
  let [url, setUrl] = React22.useState(""), [dragActive, setDragActive] = React22.useState(!1), inputFileRef = React22.useRef(null), handleDrag = (e) => {
    e.preventDefault(), e.stopPropagation(), e.type === "dragenter" || e.type === "dragover" ? setDragActive(!0) : e.type === "dragleave" && setDragActive(!1);
  }, handleDrop = (e) => {
    e.preventDefault(), e.stopPropagation(), setDragActive(!1), e.dataTransfer.files && e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]);
  }, handleChange = (e) => {
    e.preventDefault(), e.target.files && e.target.files[0] && handleFile(e.target.files[0]);
  }, handleFile = (file) => {
    onAdd?.({ type: "file", data: file }), onOpenChange(!1);
  };
  return /* @__PURE__ */ jsx26(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs17(DialogContent, { children: [
    /* @__PURE__ */ jsxs17(DialogHeader, { children: [
      /* @__PURE__ */ jsx26(DialogTitle, { children: "Add to Library" }),
      /* @__PURE__ */ jsx26(DialogDescription, { children: "Add files or URLs to your library for easy access." })
    ] }),
    /* @__PURE__ */ jsxs17(Tabs, { defaultValue: "file", className: "w-full", children: [
      /* @__PURE__ */ jsxs17(TabsList, { className: "grid w-full grid-cols-2", children: [
        /* @__PURE__ */ jsx26(TabsTrigger, { value: "file", children: "File Upload" }),
        /* @__PURE__ */ jsx26(TabsTrigger, { value: "url", children: "URL" })
      ] }),
      /* @__PURE__ */ jsx26(TabsContent, { value: "file", className: "mt-4", children: /* @__PURE__ */ jsx26(
        "div",
        {
          className: `relative grid gap-4 ${dragActive ? "cursor-copy" : "cursor-pointer"}`,
          onClick: () => inputFileRef.current?.click(),
          onDragEnter: handleDrag,
          onDragLeave: handleDrag,
          onDragOver: handleDrag,
          onDrop: handleDrop,
          children: /* @__PURE__ */ jsxs17(
            "div",
            {
              className: `flex min-h-[150px] flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${dragActive ? "border-primary/50 bg-primary/5" : "border-muted-foreground/25"}`,
              children: [
                /* @__PURE__ */ jsx26(FileUp, { className: "mb-4 h-8 w-8 text-muted-foreground" }),
                /* @__PURE__ */ jsx26("p", { className: "mb-2 text-sm font-medium", children: "Drag & drop files here or click to browse" }),
                /* @__PURE__ */ jsx26("p", { className: "text-xs text-muted-foreground", children: "Supported file types: PDF, DOC, DOCX, TXT" }),
                /* @__PURE__ */ jsx26(
                  "input",
                  {
                    ref: inputFileRef,
                    type: "file",
                    className: "hidden",
                    accept: ".pdf,.doc,.docx,.txt",
                    onChange: handleChange
                  }
                )
              ]
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx26(TabsContent, { value: "url", className: "mt-4", children: /* @__PURE__ */ jsx26("form", { onSubmit: (e) => {
        e.preventDefault(), url && (onAdd?.({ type: "url", data: url }), setUrl(""), onOpenChange(!1));
      }, className: "grid gap-4", children: /* @__PURE__ */ jsxs17("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsx26(Label2, { htmlFor: "url", children: "URL" }),
        /* @__PURE__ */ jsxs17("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs17("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx26(Globe, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx26(
              Input,
              {
                id: "url",
                type: "url",
                placeholder: "https://example.com",
                className: "pl-8",
                value: url,
                onChange: (e) => setUrl(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs17(Button, { type: "submit", children: [
            /* @__PURE__ */ jsx26(Upload, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx26("span", { className: "sr-only", children: "Add URL" })
          ] })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx26(Separator2, {}),
    /* @__PURE__ */ jsx26("div", { className: "text-xs text-muted-foreground", children: /* @__PURE__ */ jsx26("p", { children: "By adding items to the library, you agree to our terms of service." }) })
  ] }) });
}

// app/hooks/use-workspaces.tsx
import * as React23 from "react";
function sortByName(items2) {
  return [...items2].sort((a, b) => a.name.localeCompare(b.name));
}
var workspaces = [
  {
    id: "daily-journal",
    name: "Daily Journal & Reflection",
    emoji: "\u{1F4D4}",
    pages: [
      {
        id: "journal-2024",
        name: "2024 Entries",
        emoji: "\u{1F4C5}",
        pages: [
          {
            id: "march-2024",
            name: "March 2024",
            emoji: "\u{1F338}"
          }
        ]
      }
    ]
  },
  {
    id: "health-tracker",
    name: "Health & Wellness Tracker",
    emoji: "\u{1F34F}",
    pages: [
      {
        id: "workout-log",
        name: "Workout Log",
        emoji: "\u{1F4AA}"
      },
      {
        id: "meal-planning",
        name: "Meal Planning",
        emoji: "\u{1F957}"
      }
    ]
  },
  {
    id: "project-notes",
    name: "Project Notes",
    emoji: "\u{1F4DD}",
    pages: [
      {
        id: "active-projects",
        name: "Active Projects",
        emoji: "\u{1F3AF}"
      },
      {
        id: "archived-projects",
        name: "Archived Projects",
        emoji: "\u{1F4E6}"
      }
    ]
  }
], listeners5 = /* @__PURE__ */ new Set();
function generateId() {
  return `page-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function sortPagesRecursively(pages) {
  return sortByName(pages).map((page) => ({
    ...page,
    pages: page.pages ? sortPagesRecursively(page.pages) : void 0
  }));
}
function getSortedWorkspaces() {
  return sortByName(workspaces).map((workspace) => ({
    ...workspace,
    pages: sortPagesRecursively(workspace.pages)
  }));
}
function findAndUpdate(items2, parentId, update) {
  for (let item of items2) {
    if (item.id === parentId)
      return update(item), !0;
    if (item.pages && findAndUpdate(item.pages, parentId, update))
      return !0;
  }
  return !1;
}
function useWorkspaces() {
  let [data3, setData] = React23.useState(getSortedWorkspaces()), { setPageTitle } = usePageTitles(), { setEmoji } = usePageEmoji(data3[0]?.id || "");
  React23.useEffect(() => {
    let updateWorkspaces = () => {
      setData(getSortedWorkspaces());
    };
    return listeners5.add(updateWorkspaces), () => {
      listeners5.delete(updateWorkspaces);
    };
  }, []);
  let addPage = React23.useCallback((parentId) => {
    let newPage = {
      id: generateId(),
      name: "Untitled",
      emoji: "\u{1F4C4}",
      pages: []
    };
    return parentId ? findAndUpdate(workspaces, parentId, (parent) => {
      parent.pages || (parent.pages = []), parent.pages.push(newPage);
    }) : workspaces.push({
      ...newPage,
      pages: []
    }), setPageTitle(newPage.id, newPage.name), setEmoji(newPage.emoji), listeners5.forEach((listener) => listener()), newPage;
  }, [setPageTitle, setEmoji]);
  return {
    workspaces: data3,
    addPage
  };
}

// app/components/ui/collapsible.tsx
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
var Collapsible = CollapsiblePrimitive.Root, CollapsibleTrigger2 = CollapsiblePrimitive.CollapsibleTrigger, CollapsibleContent2 = CollapsiblePrimitive.CollapsibleContent;

// app/components/nav-workspaces.tsx
import { Fragment as Fragment2, jsx as jsx27, jsxs as jsxs18 } from "react/jsx-runtime";
var ITEMS_PER_PAGE = 5;
function PageItem({ page, onPageTitleChange, basePath = "/pages" }) {
  let navigate = useNavigate(), { getPageTitle } = usePageTitles(), { getEmoji } = usePageEmoji(page.id), { addPage } = useWorkspaces(), [isPending, startTransition] = React24.useTransition(), [isOpen, setIsOpen] = React24.useState(!1), hasChildren = page.pages && page.pages.length > 0, title = getPageTitle(page.id, page.name), emoji = getEmoji(page.id) || page.emoji, handleAddPage = (e) => {
    e.preventDefault(), e.stopPropagation(), startTransition(() => {
      let newPage = addPage(page.id);
      setIsOpen(!0), navigate(`${basePath}/${newPage.id}`);
    });
  };
  return hasChildren ? /* @__PURE__ */ jsx27(Collapsible, { open: isOpen, onOpenChange: setIsOpen, children: /* @__PURE__ */ jsxs18(SidebarMenuItem, { className: "pl-3", children: [
    /* @__PURE__ */ jsx27(Link3, { to: `${basePath}/${page.id}`, className: "w-full", children: /* @__PURE__ */ jsxs18(SidebarMenuButton, { children: [
      /* @__PURE__ */ jsx27("span", { children: emoji }),
      /* @__PURE__ */ jsx27("span", { children: title })
    ] }) }),
    /* @__PURE__ */ jsx27(CollapsibleTrigger2, { asChild: !0, children: /* @__PURE__ */ jsx27(
      SidebarMenuAction,
      {
        className: "left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90",
        showOnHover: !0,
        children: /* @__PURE__ */ jsx27(ChevronRight2, {})
      }
    ) }),
    /* @__PURE__ */ jsx27(
      SidebarMenuAction,
      {
        showOnHover: !0,
        onClick: handleAddPage,
        disabled: isPending,
        children: /* @__PURE__ */ jsx27(Plus, {})
      }
    ),
    /* @__PURE__ */ jsx27(CollapsibleContent2, { children: /* @__PURE__ */ jsx27(SidebarMenuSub, { children: page.pages?.map((subPage) => /* @__PURE__ */ jsx27(
      PageItem,
      {
        page: subPage,
        onPageTitleChange,
        basePath
      },
      subPage.id
    )) }) })
  ] }) }) : /* @__PURE__ */ jsx27(SidebarMenuSubItem, { children: /* @__PURE__ */ jsx27(Link3, { to: `${basePath}/${page.id}`, className: "w-full", children: /* @__PURE__ */ jsxs18(SidebarMenuSubButton, { children: [
    /* @__PURE__ */ jsx27("span", { children: emoji }),
    /* @__PURE__ */ jsx27("span", { children: title })
  ] }) }) });
}
function WorkspaceItem({ workspace, onPageTitleChange, basePath = "/pages", isExpanded = !1 }) {
  let navigate = useNavigate(), { getPageTitle } = usePageTitles(), { getEmoji } = usePageEmoji(workspace.id), { addPage } = useWorkspaces(), [isPending, startTransition] = React24.useTransition(), [isOpen, setIsOpen] = React24.useState(isExpanded), title = getPageTitle(workspace.id, workspace.name), emoji = getEmoji(workspace.id) || workspace.emoji;
  React24.useEffect(() => {
    isExpanded && setIsOpen(!0);
  }, [isExpanded]);
  let handleAddPage = (e) => {
    e.preventDefault(), e.stopPropagation(), startTransition(() => {
      let newPage = addPage(workspace.id);
      setIsOpen(!0), navigate(`${basePath}/${newPage.id}`);
    });
  };
  return /* @__PURE__ */ jsx27(Collapsible, { open: isOpen, onOpenChange: setIsOpen, children: /* @__PURE__ */ jsxs18(SidebarMenuItem, { children: [
    /* @__PURE__ */ jsx27(Link3, { to: `${basePath}/${workspace.id}`, className: "w-full", children: /* @__PURE__ */ jsxs18(SidebarMenuButton, { children: [
      /* @__PURE__ */ jsx27("span", { children: emoji }),
      /* @__PURE__ */ jsx27("span", { children: title })
    ] }) }),
    workspace.pages.length > 0 && /* @__PURE__ */ jsx27(CollapsibleTrigger2, { asChild: !0, children: /* @__PURE__ */ jsx27(
      SidebarMenuAction,
      {
        className: "left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90",
        showOnHover: !0,
        children: /* @__PURE__ */ jsx27(ChevronRight2, {})
      }
    ) }),
    /* @__PURE__ */ jsx27(
      SidebarMenuAction,
      {
        showOnHover: !0,
        onClick: handleAddPage,
        disabled: isPending,
        children: /* @__PURE__ */ jsx27(Plus, {})
      }
    ),
    /* @__PURE__ */ jsx27(CollapsibleContent2, { children: /* @__PURE__ */ jsx27(SidebarMenuSub, { children: workspace.pages.map((page) => /* @__PURE__ */ jsx27(
      PageItem,
      {
        page,
        onPageTitleChange,
        basePath
      },
      page.id
    )) }) })
  ] }) });
}
function NavWorkspaces({ onPageTitleChange }) {
  let { isMobile } = useSidebar(), navigate = useNavigate(), [addLibraryOpen, setAddLibraryOpen] = React24.useState(!1), { workspaces: workspaces2, addPage } = useWorkspaces(), [isPending, startTransition] = React24.useTransition(), [visibleItems, setVisibleItems] = React24.useState(ITEMS_PER_PAGE), handleAddLibraryItem = (item) => {
    console.log("Adding library item:", item);
  }, handleCreatePage = React24.useCallback(() => {
    startTransition(() => {
      let newPage = addPage();
      navigate(`/pages/${newPage.id}`);
    });
  }, [addPage, navigate]), handleLoadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  }, visibleWorkspaces = workspaces2.slice(0, visibleItems), hasMore = visibleItems < workspaces2.length;
  return /* @__PURE__ */ jsxs18(Fragment2, { children: [
    /* @__PURE__ */ jsx27(
      AddLibraryItem,
      {
        open: addLibraryOpen,
        onOpenChange: setAddLibraryOpen,
        onAdd: handleAddLibraryItem
      }
    ),
    /* @__PURE__ */ jsxs18(SidebarGroup, { children: [
      /* @__PURE__ */ jsx27(SidebarGroupLabel, { children: "Pages" }),
      /* @__PURE__ */ jsx27(SidebarGroupContent, { children: /* @__PURE__ */ jsxs18(SidebarMenu, { children: [
        visibleWorkspaces.map((workspace) => /* @__PURE__ */ jsx27(
          WorkspaceItem,
          {
            workspace,
            onPageTitleChange
          },
          workspace.id
        )),
        /* @__PURE__ */ jsx27(SidebarMenuItem, { children: hasMore ? /* @__PURE__ */ jsxs18(
          SidebarMenuButton,
          {
            className: "text-sidebar-foreground/70",
            onClick: handleLoadMore,
            children: [
              /* @__PURE__ */ jsx27(MoreHorizontal3, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxs18("span", { children: [
                "Show More (",
                workspaces2.length - visibleItems,
                " remaining)"
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxs18(
          SidebarMenuButton,
          {
            className: "text-sidebar-foreground/70",
            onClick: handleCreatePage,
            disabled: isPending,
            children: [
              /* @__PURE__ */ jsx27(Plus, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx27("span", { children: isPending ? "Creating..." : "Add Page" })
            ]
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs18(SidebarGroup, { children: [
      /* @__PURE__ */ jsx27(SidebarGroupLabel, { children: "Library" }),
      /* @__PURE__ */ jsx27(SidebarGroupContent, { children: /* @__PURE__ */ jsxs18(SidebarMenu, { children: [
        visibleWorkspaces.map((workspace) => /* @__PURE__ */ jsx27(
          WorkspaceItem,
          {
            workspace,
            onPageTitleChange,
            basePath: "/library"
          },
          workspace.id
        )),
        /* @__PURE__ */ jsx27(SidebarMenuItem, { children: hasMore ? /* @__PURE__ */ jsxs18(
          SidebarMenuButton,
          {
            className: "text-sidebar-foreground/70",
            onClick: handleLoadMore,
            children: [
              /* @__PURE__ */ jsx27(MoreHorizontal3, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxs18("span", { children: [
                "Show More (",
                workspaces2.length - visibleItems,
                " remaining)"
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxs18(
          SidebarMenuButton,
          {
            className: "text-sidebar-foreground/70",
            onClick: () => setAddLibraryOpen(!0),
            children: [
              /* @__PURE__ */ jsx27(Plus, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx27("span", { children: "Add to Library" })
            ]
          }
        ) })
      ] }) })
    ] })
  ] });
}

// app/components/token-usage.tsx
import * as React26 from "react";
import { ArrowUpCircle } from "lucide-react";

// app/components/upgrade-dialog.tsx
import * as React25 from "react";
import { Check as Check2, CreditCard as CreditCard2, Infinity, Sparkles as Sparkles2 } from "lucide-react";
import { jsx as jsx28, jsxs as jsxs19 } from "react/jsx-runtime";
var plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: 21,
    interval: "month",
    tokens: "Unlimited"
  },
  {
    id: "yearly",
    name: "Yearly",
    price: 17,
    interval: "year",
    tokens: "Unlimited",
    featured: !0,
    savings: "Save 20%"
  }
], features = {
  free: [
    "50K AI tokens per month",
    "Basic AI assistance",
    "Standard response time",
    "Community support"
  ],
  pro: [
    "Unlimited AI tokens",
    "Advanced AI models & features",
    "Priority response time",
    "Real-time AI analysis",
    "Custom AI training",
    "Priority support",
    "Early access to new features",
    "API access"
  ]
};
function UpgradeDialog({ open, onOpenChange }) {
  let [selectedPlan, setSelectedPlan] = React25.useState("yearly");
  return /* @__PURE__ */ jsx28(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs19(DialogContent, { className: "max-w-3xl", children: [
    /* @__PURE__ */ jsx28(DialogHeader, { children: /* @__PURE__ */ jsxs19(DialogTitle, { className: "text-center", children: [
      /* @__PURE__ */ jsx28("div", { className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsx28(Sparkles2, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsx28("div", { className: "text-2xl font-bold", children: "Upgrade to Pro" }),
      /* @__PURE__ */ jsx28("div", { className: "mt-2 text-base font-normal text-muted-foreground", children: "Unlock unlimited AI capabilities and take your work to the next level" })
    ] }) }),
    /* @__PURE__ */ jsxs19("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsx28("div", { className: "mb-8 flex justify-center gap-4", children: plans.map((plan) => /* @__PURE__ */ jsxs19(
        "button",
        {
          onClick: () => setSelectedPlan(plan.id),
          className: cn(
            "group relative rounded-xl border px-6 py-3 text-left transition-all hover:border-primary/50",
            selectedPlan === plan.id ? "border-primary bg-primary/5" : "border-border",
            plan.featured && "border-primary"
          ),
          children: [
            plan.featured && /* @__PURE__ */ jsx28("div", { className: "absolute -top-2.5 right-4 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground", children: plan.savings }),
            /* @__PURE__ */ jsxs19("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx28("div", { className: "text-lg font-medium", children: plan.name }),
              /* @__PURE__ */ jsxs19("div", { className: "text-sm text-muted-foreground", children: [
                "$",
                plan.price,
                "/",
                plan.interval
              ] })
            ] })
          ]
        },
        plan.id
      )) }),
      /* @__PURE__ */ jsxs19("div", { className: "mb-8 grid gap-8 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs19("div", { className: "rounded-xl border border-border p-6", children: [
          /* @__PURE__ */ jsxs19("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx28("div", { className: "text-lg font-medium", children: "Free" }),
            /* @__PURE__ */ jsx28("div", { className: "mt-2 text-3xl font-bold", children: "$0" }),
            /* @__PURE__ */ jsx28("div", { className: "mt-2 text-sm text-muted-foreground", children: "For individuals just getting started" })
          ] }),
          /* @__PURE__ */ jsx28("div", { className: "space-y-4", children: features.free.map((feature) => /* @__PURE__ */ jsxs19("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx28(Check2, { className: "mt-0.5 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx28("span", { className: "text-sm", children: feature })
          ] }, feature)) })
        ] }),
        /* @__PURE__ */ jsxs19("div", { className: "relative rounded-xl border border-primary bg-primary/5 p-6", children: [
          /* @__PURE__ */ jsx28("div", { className: "absolute -top-3 left-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground", children: "Most Popular" }),
          /* @__PURE__ */ jsxs19("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx28("div", { className: "text-lg font-medium", children: "Pro" }),
            /* @__PURE__ */ jsxs19("div", { className: "mt-2 flex items-baseline gap-2", children: [
              /* @__PURE__ */ jsxs19("div", { className: "text-3xl font-bold", children: [
                "$",
                selectedPlan === "yearly" ? "17" : "21"
              ] }),
              /* @__PURE__ */ jsxs19("div", { className: "text-sm text-muted-foreground", children: [
                "per ",
                selectedPlan === "yearly" ? "year" : "month"
              ] })
            ] }),
            /* @__PURE__ */ jsx28("div", { className: "mt-2 text-sm text-muted-foreground", children: "Everything in Free, plus..." })
          ] }),
          /* @__PURE__ */ jsx28("div", { className: "space-y-4", children: features.pro.map((feature) => /* @__PURE__ */ jsxs19("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx28("div", { className: "mt-0.5 rounded-full bg-primary/10 p-0.5", children: /* @__PURE__ */ jsx28(Check2, { className: "h-3 w-3 text-primary" }) }),
            /* @__PURE__ */ jsx28("span", { className: "text-sm font-medium", children: feature })
          ] }, feature)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs19("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs19(Button, { className: "w-full", size: "lg", children: [
          /* @__PURE__ */ jsx28(CreditCard2, { className: "mr-2 h-4 w-4" }),
          "Upgrade to Pro"
        ] }),
        /* @__PURE__ */ jsxs19("div", { className: "flex items-center justify-center gap-2 text-center text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsx28(Infinity, { className: "h-3 w-3" }),
          /* @__PURE__ */ jsx28("span", { children: "Unlimited AI tokens with Pro plan" })
        ] })
      ] })
    ] })
  ] }) });
}

// app/components/token-usage.tsx
import { Fragment as Fragment3, jsx as jsx29, jsxs as jsxs20 } from "react/jsx-runtime";
function TokenUsage({ totalTokens, usedTokens }) {
  let [upgradeOpen, setUpgradeOpen] = React26.useState(!1), percentage = Math.round(usedTokens / totalTokens * 100), remaining = totalTokens - usedTokens, isLow = percentage > 80;
  return /* @__PURE__ */ jsxs20(Fragment3, { children: [
    /* @__PURE__ */ jsx29(UpgradeDialog, { open: upgradeOpen, onOpenChange: setUpgradeOpen }),
    /* @__PURE__ */ jsx29("div", { className: "border-t border-sidebar-border bg-sidebar p-4", children: /* @__PURE__ */ jsxs20("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs20("div", { className: "flex items-center justify-between text-[11px]", children: [
        /* @__PURE__ */ jsx29("span", { className: "font-medium uppercase tracking-wide text-sidebar-foreground/70", children: "Token Usage" }),
        /* @__PURE__ */ jsxs20("span", { className: `font-medium ${isLow ? "text-red-500" : "text-sidebar-foreground/70"}`, children: [
          percentage,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsx29("div", { className: "relative h-1 overflow-hidden rounded-full bg-sidebar-accent", children: /* @__PURE__ */ jsx29(
        "div",
        {
          className: `absolute left-0 top-0 h-full rounded-full transition-all duration-300 ${isLow ? "bg-red-500" : "bg-blue-500"}`,
          style: { width: `${percentage}%` }
        }
      ) }),
      /* @__PURE__ */ jsxs20("div", { className: "flex items-center justify-between text-[11px]", children: [
        /* @__PURE__ */ jsxs20("span", { className: "text-sidebar-foreground/70", children: [
          remaining.toLocaleString(),
          " tokens remaining"
        ] }),
        /* @__PURE__ */ jsxs20(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "h-auto p-0 text-[11px] font-medium text-blue-500 hover:text-blue-600",
            onClick: () => setUpgradeOpen(!0),
            children: [
              /* @__PURE__ */ jsx29(ArrowUpCircle, { className: "mr-1 h-3 w-3" }),
              "Upgrade"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}

// app/components/user-switcher.tsx
import * as React29 from "react";
import {
  BadgeCheck,
  Bell as Bell3,
  ChevronsUpDown,
  CreditCard as CreditCard5,
  LogOut,
  Sparkles as Sparkles3
} from "lucide-react";

// app/components/settings-dialog.tsx
import * as React27 from "react";
import {
  CircleUser as CircleUser2,
  KeyRound as KeyRound2,
  Settings as SettingsIcon2,
  Bell as Bell2,
  CreditCard as CreditCard4
} from "lucide-react";

// app/components/settings/billing-settings.tsx
import { CreditCard as CreditCard3, Package } from "lucide-react";
import { jsx as jsx30, jsxs as jsxs21 } from "react/jsx-runtime";
var billingInfo = {
  plan: "Free",
  nextBilling: "No billing scheduled",
  paymentMethod: {
    type: "None",
    last4: "",
    expiry: ""
  },
  tokens: {
    used: 25e3,
    total: 5e4
  }
};
function BillingSettings() {
  return /* @__PURE__ */ jsxs21("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs21("div", { children: [
      /* @__PURE__ */ jsx30("h3", { className: "text-lg font-medium", children: "Billing & Subscription" }),
      /* @__PURE__ */ jsx30("p", { className: "text-sm text-muted-foreground", children: "Manage your billing information and subscription plan" })
    ] }),
    /* @__PURE__ */ jsx30(Separator2, {}),
    /* @__PURE__ */ jsxs21("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs21("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs21("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx30("h4", { className: "text-sm font-medium", children: "Current Plan" }),
          /* @__PURE__ */ jsxs21("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx30(Package, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx30("p", { className: "text-sm text-muted-foreground", children: billingInfo.plan })
          ] })
        ] }),
        /* @__PURE__ */ jsx30(Button, { children: "Upgrade Plan" })
      ] }),
      /* @__PURE__ */ jsxs21("div", { className: "rounded-lg border p-4", children: [
        /* @__PURE__ */ jsx30("h4", { className: "text-sm font-medium mb-3", children: "AI Token Usage" }),
        /* @__PURE__ */ jsxs21("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs21("div", { className: "text-sm text-muted-foreground", children: [
            billingInfo.tokens.used.toLocaleString(),
            " / ",
            billingInfo.tokens.total.toLocaleString(),
            " tokens used"
          ] }),
          /* @__PURE__ */ jsx30("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsx30(
            "div",
            {
              className: "h-full bg-primary transition-all duration-500",
              style: { width: `${billingInfo.tokens.used / billingInfo.tokens.total * 100}%` }
            }
          ) }),
          /* @__PURE__ */ jsx30("p", { className: "text-xs text-muted-foreground", children: "Resets on the 1st of each month" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs21("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs21("div", { children: [
        /* @__PURE__ */ jsx30("h4", { className: "text-sm font-medium mb-1", children: "Payment Method" }),
        /* @__PURE__ */ jsx30("p", { className: "text-sm text-muted-foreground", children: billingInfo.paymentMethod.type === "None" ? "No payment method added" : `${billingInfo.paymentMethod.type} ending in ${billingInfo.paymentMethod.last4}` })
      ] }),
      /* @__PURE__ */ jsxs21(Button, { variant: "outline", className: "gap-2", children: [
        /* @__PURE__ */ jsx30(CreditCard3, { className: "h-4 w-4" }),
        "Add Payment Method"
      ] })
    ] }),
    /* @__PURE__ */ jsxs21("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx30("h4", { className: "text-sm font-medium", children: "Billing History" }),
      /* @__PURE__ */ jsx30("div", { className: "rounded-lg border", children: /* @__PURE__ */ jsx30("div", { className: "p-4 text-center text-sm text-muted-foreground", children: "No billing history available" }) })
    ] })
  ] });
}

// app/components/settings-dialog.tsx
import { jsx as jsx31, jsxs as jsxs22 } from "react/jsx-runtime";
var personalSections2 = [
  {
    id: "account",
    label: "My Account",
    icon: CircleUser2,
    component: AccountSettings
  },
  {
    id: "settings",
    label: "My Settings",
    icon: SettingsIcon2,
    component: AppSettings
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard4,
    component: BillingSettings
  },
  {
    id: "notifications",
    label: "My Notifications",
    icon: Bell2,
    component: NotificationSettings
  },
  {
    id: "security",
    label: "Security & Data",
    icon: KeyRound2,
    component: SecuritySettings
  }
];
function SettingsDialog({
  open,
  onOpenChange,
  defaultSection = "account"
}) {
  let [activeSection, setActiveSection] = React27.useState(defaultSection);
  React27.useEffect(() => {
    defaultSection && setActiveSection(defaultSection);
  }, [defaultSection]);
  let ActiveComponent = personalSections2.find((s) => s.id === activeSection)?.component || AccountSettings, activeTitle = personalSections2.find((s) => s.id === activeSection)?.label || "Settings";
  return /* @__PURE__ */ jsx31(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs22(DialogContent, { className: "max-w-[1200px] h-[85vh] p-0 gap-0", children: [
    /* @__PURE__ */ jsx31(DialogHeader, { className: "sr-only", children: /* @__PURE__ */ jsx31(DialogTitle, { children: activeTitle }) }),
    /* @__PURE__ */ jsxs22("div", { className: "flex h-full overflow-hidden rounded-xl", children: [
      /* @__PURE__ */ jsx31("div", { className: "w-60 bg-muted/50 overflow-y-auto flex-shrink-0 rounded-l-xl border-r", children: /* @__PURE__ */ jsx31("div", { className: "px-2 pt-4 pb-4", children: /* @__PURE__ */ jsxs22("div", { className: "px-2", children: [
        /* @__PURE__ */ jsx31("div", { className: "text-[11px] font-semibold text-muted-foreground mb-1.5", children: "SETTINGS" }),
        /* @__PURE__ */ jsx31("nav", { className: "mt-4 space-y-0.5 px-1", children: personalSections2.map((section) => {
          let Icon = section.icon;
          return /* @__PURE__ */ jsxs22(
            "button",
            {
              className: `w-full flex items-center px-2 py-1.5 h-8 text-sm font-medium rounded-lg transition-colors ${activeSection === section.id ? "bg-background text-foreground hover:bg-background" : "text-muted-foreground hover:bg-background/50 hover:text-foreground"}`,
              onClick: () => setActiveSection(section.id),
              children: [
                /* @__PURE__ */ jsx31(Icon, { className: "h-4 w-4 mr-2 shrink-0" }),
                section.label
              ]
            },
            section.id
          );
        }) })
      ] }) }) }),
      /* @__PURE__ */ jsx31("div", { className: "flex-1 min-h-0 bg-background rounded-r-xl", children: /* @__PURE__ */ jsx31("div", { className: "h-full overflow-y-auto", children: /* @__PURE__ */ jsx31("div", { className: "max-w-3xl mx-auto p-8", children: /* @__PURE__ */ jsx31(ActiveComponent, {}) }) }) })
    ] })
  ] }) });
}

// app/components/ui/avatar.tsx
import * as React28 from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { jsx as jsx32 } from "react/jsx-runtime";
var Avatar = React28.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx32(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
var AvatarImage = React28.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx32(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallback = React28.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx32(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// app/components/user-switcher.tsx
import { Fragment as Fragment4, jsx as jsx33, jsxs as jsxs23 } from "react/jsx-runtime";
function UserSwitcher({
  user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://github.com/shadcn.png"
  }
}) {
  let { isMobile } = useSidebar(), [upgradeOpen, setUpgradeOpen] = React29.useState(!1), [settingsOpen, setSettingsOpen] = React29.useState(!1), [activeSection, setActiveSection] = React29.useState("account"), openNotificationSettings = () => {
    setActiveSection("notifications"), setSettingsOpen(!0);
  };
  return /* @__PURE__ */ jsxs23(Fragment4, { children: [
    /* @__PURE__ */ jsx33(UpgradeDialog, { open: upgradeOpen, onOpenChange: setUpgradeOpen }),
    /* @__PURE__ */ jsx33(
      SettingsDialog,
      {
        open: settingsOpen,
        onOpenChange: setSettingsOpen,
        defaultSection: activeSection
      }
    ),
    /* @__PURE__ */ jsx33(SidebarMenu, { children: /* @__PURE__ */ jsx33(SidebarMenuItem, { children: /* @__PURE__ */ jsxs23(DropdownMenu, { children: [
      /* @__PURE__ */ jsx33(DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ jsxs23(
        SidebarMenuButton,
        {
          size: "lg",
          className: "cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
          children: [
            /* @__PURE__ */ jsxs23(Avatar, { className: "h-8 w-8 rounded-lg", children: [
              /* @__PURE__ */ jsx33(AvatarImage, { src: user.avatar, alt: user.name }),
              /* @__PURE__ */ jsx33(AvatarFallback, { className: "rounded-lg", children: user.name.split(" ").map((n) => n[0]).join("") })
            ] }),
            /* @__PURE__ */ jsxs23("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
              /* @__PURE__ */ jsx33("span", { className: "truncate font-semibold", children: user.name }),
              /* @__PURE__ */ jsx33("span", { className: "truncate text-xs", children: user.email })
            ] }),
            /* @__PURE__ */ jsx33(ChevronsUpDown, { className: "ml-auto size-4" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs23(
        DropdownMenuContent,
        {
          className: "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
          side: isMobile ? "bottom" : "right",
          align: "start",
          sideOffset: 4,
          children: [
            /* @__PURE__ */ jsx33(DropdownMenuLabel, { className: "p-0 font-normal", children: /* @__PURE__ */ jsxs23("div", { className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm", children: [
              /* @__PURE__ */ jsxs23(Avatar, { className: "h-8 w-8 rounded-lg", children: [
                /* @__PURE__ */ jsx33(AvatarImage, { src: user.avatar, alt: user.name }),
                /* @__PURE__ */ jsx33(AvatarFallback, { className: "rounded-lg", children: user.name.split(" ").map((n) => n[0]).join("") })
              ] }),
              /* @__PURE__ */ jsxs23("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
                /* @__PURE__ */ jsx33("span", { className: "truncate font-semibold", children: user.name }),
                /* @__PURE__ */ jsx33("span", { className: "truncate text-xs", children: user.email })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx33(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsx33(DropdownMenuGroup, { children: /* @__PURE__ */ jsxs23(
              DropdownMenuItem,
              {
                onClick: () => setUpgradeOpen(!0),
                className: "text-blue-500 dark:text-blue-400 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsx33(Sparkles3, { className: "mr-2 h-4 w-4" }),
                  /* @__PURE__ */ jsx33("span", { children: "Upgrade to Pro" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx33(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxs23(DropdownMenuGroup, { children: [
              /* @__PURE__ */ jsxs23(
                DropdownMenuItem,
                {
                  onClick: () => {
                    setActiveSection("account"), setSettingsOpen(!0);
                  },
                  className: "cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsx33(BadgeCheck, { className: "mr-2 h-4 w-4" }),
                    /* @__PURE__ */ jsx33("span", { children: "Account" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs23(
                DropdownMenuItem,
                {
                  onClick: () => {
                    setActiveSection("billing"), setSettingsOpen(!0);
                  },
                  className: "cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsx33(CreditCard5, { className: "mr-2 h-4 w-4" }),
                    /* @__PURE__ */ jsx33("span", { children: "Billing" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs23(
                DropdownMenuItem,
                {
                  onClick: openNotificationSettings,
                  className: "cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsx33(Bell3, { className: "mr-2 h-4 w-4" }),
                    /* @__PURE__ */ jsx33("span", { children: "Notifications" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx33(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxs23(DropdownMenuItem, { className: "cursor-pointer text-red-600 dark:text-red-400", children: [
              /* @__PURE__ */ jsx33(LogOut, { className: "mr-2 h-4 w-4" }),
              /* @__PURE__ */ jsx33("span", { children: "Log out" })
            ] })
          ]
        }
      )
    ] }) }) })
  ] });
}

// app/components/app-sidebar.tsx
import { jsx as jsx34, jsxs as jsxs24 } from "react/jsx-runtime";
var data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://github.com/shadcn.png"
  }
};
function AppSidebar({ onPageTitleChange, ...props }) {
  return /* @__PURE__ */ jsxs24(Sidebar, { className: "border-r-0", ...props, children: [
    /* @__PURE__ */ jsxs24(SidebarHeader, { children: [
      /* @__PURE__ */ jsx34(UserSwitcher, { user: data.user }),
      /* @__PURE__ */ jsx34(NavMain, {})
    ] }),
    /* @__PURE__ */ jsxs24(SidebarContent, { children: [
      /* @__PURE__ */ jsx34(NavFavorites, {}),
      /* @__PURE__ */ jsx34(NavWorkspaces, { onPageTitleChange })
    ] }),
    /* @__PURE__ */ jsx34(TokenUsage, { totalTokens: 5e4, usedTokens: 25e3 }),
    /* @__PURE__ */ jsx34(SidebarRail, {})
  ] });
}

// app/components/emoji-picker.tsx
import { Smile as Smile2 } from "lucide-react";

// app/components/ui/popover.tsx
import * as React30 from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { jsx as jsx35 } from "react/jsx-runtime";
var Popover = PopoverPrimitive.Root, PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverContent = React30.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx35(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx35(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// app/components/emoji-picker.tsx
import { jsx as jsx36, jsxs as jsxs25 } from "react/jsx-runtime";
var EMOJI_CATEGORIES = [
  {
    name: "Smileys",
    emojis: ["\u{1F600}", "\u{1F603}", "\u{1F604}", "\u{1F601}", "\u{1F605}", "\u{1F602}", "\u{1F923}", "\u{1F60A}", "\u{1F607}", "\u{1F642}", "\u{1F609}", "\u{1F60C}", "\u{1F60D}", "\u{1F970}", "\u{1F618}"]
  },
  {
    name: "Objects",
    emojis: ["\u{1F4DD}", "\u{1F4DA}", "\u{1F4D6}", "\u{1F4D3}", "\u{1F4D4}", "\u{1F4D2}", "\u{1F4D5}", "\u{1F4D7}", "\u{1F4D8}", "\u{1F4D9}", "\u{1F4CC}", "\u{1F4CD}", "\u{1F4CE}", "\u{1F50D}", "\u{1F4A1}"]
  },
  {
    name: "Symbols",
    emojis: ["\u2764\uFE0F", "\u{1F4AB}", "\u2B50", "\u{1F31F}", "\u2728", "\u{1F4A5}", "\u{1F4A2}", "\u{1F4A6}", "\u{1F4A8}", "\u{1F54A}\uFE0F", "\u{1F525}", "\u2705", "\u274C", "\u2753", "\u2757"]
  }
];
function EmojiPicker({ value = "\u{1F4C4}", onChange }) {
  return /* @__PURE__ */ jsxs25(Popover, { children: [
    /* @__PURE__ */ jsx36(PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ jsx36(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: "h-auto p-0 text-xl hover:bg-transparent focus-visible:ring-0",
        children: value || /* @__PURE__ */ jsx36(Smile2, { className: "h-4 w-4" })
      }
    ) }),
    /* @__PURE__ */ jsx36(PopoverContent, { className: "w-[280px] p-0", align: "start", children: /* @__PURE__ */ jsxs25("div", { className: "grid gap-4 p-4", children: [
      /* @__PURE__ */ jsxs25("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx36("h4", { className: "text-sm font-semibold", children: "Pick an emoji" }),
        /* @__PURE__ */ jsx36("p", { className: "text-xs text-muted-foreground", children: "Select an emoji to represent this page" })
      ] }),
      /* @__PURE__ */ jsx36("div", { className: "grid gap-2", children: EMOJI_CATEGORIES.map((category) => /* @__PURE__ */ jsxs25("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsx36("div", { className: "text-xs text-muted-foreground", children: category.name }),
        /* @__PURE__ */ jsx36("div", { className: "grid grid-cols-8 gap-2", children: category.emojis.map((emoji) => /* @__PURE__ */ jsx36(
          Button,
          {
            variant: "outline",
            className: "h-8 w-8 p-0 text-lg",
            onClick: () => onChange?.(emoji),
            children: emoji
          },
          emoji
        )) })
      ] }, category.name)) })
    ] }) })
  ] });
}

// app/components/nav-actions.tsx
import * as React38 from "react";
import { useParams, Link as Link4, useNavigate as useNavigate2 } from "@remix-run/react";
import {
  Archive as Archive3,
  Bookmark,
  BookmarkCheck,
  Copy as Copy2,
  CornerUpLeft,
  FolderTree as FolderTree2,
  GalleryVerticalEnd,
  Info,
  BookOpen,
  Link as LinkIcon,
  MoreHorizontal as MoreHorizontal4,
  Share2,
  Sparkles as Sparkles4,
  Download as Download3
} from "lucide-react";

// app/components/document-ai-chat.tsx
import * as React32 from "react";
import { Bot, Send, X as X4 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// app/components/ui/scroll-area.tsx
import * as React31 from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { jsx as jsx37, jsxs as jsxs26 } from "react/jsx-runtime";
var ScrollArea = React31.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs26(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx37(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx37(ScrollBar, {}),
      /* @__PURE__ */ jsx37(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
var ScrollBar = React31.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx37(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx37(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

// app/components/document-ai-chat.tsx
import { jsx as jsx38, jsxs as jsxs27 } from "react/jsx-runtime";
function DocumentAIChat({ open, onOpenChange, documentTitle }) {
  let [messages, setMessages] = React32.useState([
    {
      id: "welcome",
      content: `I'm here to help you with "${documentTitle || "this document"}". What would you like to know?`,
      role: "assistant",
      timestamp: /* @__PURE__ */ new Date()
    }
  ]), [input, setInput] = React32.useState(""), scrollAreaRef = React32.useRef(null), handleSend = () => {
    if (!input.trim())
      return;
    let newMessage = {
      id: String(Date.now()),
      content: input,
      role: "user",
      timestamp: /* @__PURE__ */ new Date()
    };
    setMessages((prev) => [...prev, newMessage]), setInput(""), setTimeout(() => {
      let aiResponse = {
        id: String(Date.now() + 1),
        content: "This is a simulated AI response about the document. In a real implementation, this would analyze the document content and provide relevant information.",
        role: "assistant",
        timestamp: /* @__PURE__ */ new Date()
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1e3);
  };
  return React32.useEffect(() => {
    scrollAreaRef.current && (scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight);
  }, [messages]), /* @__PURE__ */ jsx38(Sheet, { open, onOpenChange, modal: !1, children: /* @__PURE__ */ jsx38(
    SheetContent,
    {
      side: "right",
      className: "w-[400px] p-0 border-l shadow-2xl",
      children: /* @__PURE__ */ jsxs27("div", { className: "flex h-full flex-col", children: [
        /* @__PURE__ */ jsxs27("div", { className: "flex h-14 items-center justify-between border-b px-4", children: [
          /* @__PURE__ */ jsxs27("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx38(Bot, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx38("span", { className: "font-semibold", children: "Document AI Assistant" })
          ] }),
          /* @__PURE__ */ jsxs27(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-8 w-8",
              onClick: () => onOpenChange?.(!1),
              children: [
                /* @__PURE__ */ jsx38(X4, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx38("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx38(ScrollArea, { ref: scrollAreaRef, className: "flex-1 p-4", children: /* @__PURE__ */ jsx38("div", { className: "space-y-4", children: /* @__PURE__ */ jsx38(AnimatePresence, { initial: !1, children: messages.map((message) => /* @__PURE__ */ jsxs27(
          motion.div,
          {
            className: `flex gap-3 ${message.role === "assistant" ? "justify-start" : "justify-end"}`,
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 },
            children: [
              message.role === "assistant" && /* @__PURE__ */ jsx38("div", { className: "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx38(Bot, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxs27(
                "div",
                {
                  className: `group relative flex max-w-[85%] rounded-lg px-3 py-2 text-sm ${message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"}`,
                  children: [
                    /* @__PURE__ */ jsx38("div", { className: "prose prose-sm dark:prose-invert", children: message.content }),
                    /* @__PURE__ */ jsx38(
                      "div",
                      {
                        className: "absolute -top-5 right-0 hidden whitespace-nowrap text-xs text-muted-foreground group-hover:block",
                        children: message.timestamp.toLocaleTimeString()
                      }
                    )
                  ]
                }
              )
            ]
          },
          message.id
        )) }) }) }),
        /* @__PURE__ */ jsx38("div", { className: "border-t bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxs27(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault(), handleSend();
            },
            className: "flex gap-2",
            children: [
              /* @__PURE__ */ jsx38(
                Input,
                {
                  placeholder: "Ask about this document...",
                  value: input,
                  onChange: (e) => setInput(e.target.value),
                  className: "flex-1"
                }
              ),
              /* @__PURE__ */ jsxs27(Button, { type: "submit", children: [
                /* @__PURE__ */ jsx38(Send, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx38("span", { className: "sr-only", children: "Send message" })
              ] })
            ]
          }
        ) })
      ] })
    }
  ) });
}

// app/components/export-dialog.tsx
import {
  FileText as FileText3,
  FileBarChart2,
  Download,
  GraduationCap,
  MessageSquareQuote
} from "lucide-react";
import { jsx as jsx39, jsxs as jsxs28 } from "react/jsx-runtime";
var exportOptions = [
  {
    id: "pdf",
    name: "PDF",
    icon: FileText3,
    action: () => "Document exported as PDF"
  },
  {
    id: "word",
    name: "Word Document",
    icon: FileText3,
    action: () => "Document exported as Word"
  },
  {
    id: "analysis",
    name: "Analysis Report",
    icon: FileBarChart2,
    action: () => "Analysis report exported"
  },
  {
    id: "grade",
    name: "Grade Report",
    icon: GraduationCap,
    action: () => "Grade report exported"
  },
  {
    id: "argue",
    name: "Argumentation",
    icon: MessageSquareQuote,
    action: () => "Argumentation report exported"
  }
];
function ExportDialog({ open, onOpenChange }) {
  let { toast: toast2 } = useToast(), handleExport = async (action12) => {
    try {
      let message = action12();
      toast2({
        description: message
      }), onOpenChange?.(!1);
    } catch {
      toast2({
        variant: "destructive",
        description: "An error occurred while exporting."
      });
    }
  };
  return /* @__PURE__ */ jsx39(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs28(DialogContent, { className: "max-w-xs p-6", children: [
    /* @__PURE__ */ jsx39(DialogHeader, { children: /* @__PURE__ */ jsx39(DialogTitle, { className: "text-center", children: "Export As" }) }),
    /* @__PURE__ */ jsx39("div", { className: "mt-4", children: exportOptions.map((option) => {
      let Icon = option.icon;
      return /* @__PURE__ */ jsxs28(
        Button,
        {
          variant: "ghost",
          className: "w-full justify-between px-2 py-2 h-10",
          onClick: () => handleExport(option.action),
          children: [
            /* @__PURE__ */ jsxs28("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx39(Icon, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsx39("span", { children: option.name })
            ] }),
            /* @__PURE__ */ jsx39(Download, { className: "h-4 w-4 text-muted-foreground" })
          ]
        },
        option.id
      );
    }) })
  ] }) });
}

// app/components/info-dialog.tsx
import * as React33 from "react";
import { Download as Download2, Upload as Upload2 } from "lucide-react";
import { jsx as jsx40, jsxs as jsxs29 } from "react/jsx-runtime";
var scores = [
  { field: "Clarity", score: 85, color: "bg-green-500" },
  { field: "Structure", score: 92, color: "bg-blue-500" },
  { field: "Relevance", score: 78, color: "bg-yellow-500" },
  { field: "Innovation", score: 88, color: "bg-purple-500" }
];
function InfoDialog({ open, onOpenChange }) {
  let [files, setFiles] = React33.useState([]), fileInputRef = React33.useRef(null), handleFileChange = (event) => {
    event.target.files && setFiles(Array.from(event.target.files));
  }, overallScore = Math.round(
    scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length
  );
  return /* @__PURE__ */ jsx40(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs29(DialogContent, { className: "max-w-2xl max-h-[85vh]", children: [
    /* @__PURE__ */ jsx40(DialogHeader, { children: /* @__PURE__ */ jsx40(DialogTitle, { children: "Document Information" }) }),
    /* @__PURE__ */ jsx40(ScrollArea, { className: "h-[calc(85vh-8rem)] pr-4", children: /* @__PURE__ */ jsxs29("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs29("div", { children: [
        /* @__PURE__ */ jsx40("h3", { className: "text-lg font-semibold mb-4", children: "Info" }),
        /* @__PURE__ */ jsx40("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs29("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs29("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxs29(Avatar, { children: [
              /* @__PURE__ */ jsx40(AvatarImage, { src: "https://github.com/shadcn.png" }),
              /* @__PURE__ */ jsx40(AvatarFallback, { children: "JD" })
            ] }),
            /* @__PURE__ */ jsxs29("div", { children: [
              /* @__PURE__ */ jsx40("div", { className: "font-medium", children: "Project Documentation" }),
              /* @__PURE__ */ jsx40("div", { className: "text-sm text-muted-foreground", children: "Created by John Doe" })
            ] })
          ] }),
          /* @__PURE__ */ jsx40("div", { className: "text-sm text-muted-foreground", children: "March 15, 2024" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs29("div", { children: [
        /* @__PURE__ */ jsx40("h3", { className: "text-lg font-semibold mb-4", children: "Purpose" }),
        /* @__PURE__ */ jsx40(Label2, { children: "AI Goal" }),
        /* @__PURE__ */ jsx40(
          "textarea",
          {
            className: "w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            placeholder: "Enter the purpose or goal..."
          }
        )
      ] }),
      /* @__PURE__ */ jsxs29("div", { children: [
        /* @__PURE__ */ jsx40("h3", { className: "text-lg font-semibold mb-4", children: "Grading Criteria" }),
        /* @__PURE__ */ jsxs29("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs29(
            Button,
            {
              variant: "outline",
              className: "w-full justify-center",
              onClick: () => fileInputRef.current?.click(),
              children: [
                /* @__PURE__ */ jsx40(Upload2, { className: "mr-2 h-4 w-4" }),
                "Upload Documents"
              ]
            }
          ),
          /* @__PURE__ */ jsx40(
            "input",
            {
              type: "file",
              ref: fileInputRef,
              className: "hidden",
              onChange: handleFileChange,
              multiple: !0
            }
          ),
          files.length > 0 && /* @__PURE__ */ jsxs29("div", { className: "rounded-lg border p-4", children: [
            /* @__PURE__ */ jsx40("h4", { className: "text-sm font-medium mb-2", children: "Uploaded Documents" }),
            /* @__PURE__ */ jsx40("ul", { className: "space-y-2", children: files.map((file, index) => /* @__PURE__ */ jsxs29(
              "li",
              {
                className: "text-sm text-muted-foreground flex items-center justify-between",
                children: [
                  /* @__PURE__ */ jsx40("span", { children: file.name }),
                  /* @__PURE__ */ jsx40(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "h-6 text-destructive hover:text-destructive",
                      onClick: () => setFiles(files.filter((_, i) => i !== index)),
                      children: "Remove"
                    }
                  )
                ]
              },
              index
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs29("div", { children: [
        /* @__PURE__ */ jsx40("h3", { className: "text-lg font-semibold mb-4", children: "Overall Score" }),
        /* @__PURE__ */ jsxs29("div", { className: "rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 p-6 text-center mb-8", children: [
          /* @__PURE__ */ jsxs29("div", { className: "text-6xl font-bold tracking-tighter mb-2", children: [
            overallScore,
            "%"
          ] }),
          /* @__PURE__ */ jsx40("div", { className: "text-sm text-muted-foreground", children: "Overall Performance Score" })
        ] }),
        /* @__PURE__ */ jsx40("div", { className: "space-y-4", children: scores.map((score) => /* @__PURE__ */ jsxs29("div", { children: [
          /* @__PURE__ */ jsxs29("div", { className: "flex justify-between text-sm mb-1", children: [
            /* @__PURE__ */ jsx40("span", { children: score.field }),
            /* @__PURE__ */ jsxs29("span", { className: "font-medium", children: [
              score.score,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx40("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsx40(
            "div",
            {
              className: `h-full ${score.color} transition-all duration-500`,
              style: { width: `${score.score}%` }
            }
          ) })
        ] }, score.field)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx40("div", { className: "flex justify-end pt-4 border-t", children: /* @__PURE__ */ jsxs29(Button, { className: "w-full justify-center", children: [
      /* @__PURE__ */ jsx40(Download2, { className: "mr-2 h-4 w-4" }),
      "Download Report"
    ] }) })
  ] }) });
}

// app/components/link-library-dialog.tsx
import * as React34 from "react";
import { Check as Check3, Search as Search4 } from "lucide-react";
import { jsx as jsx41, jsxs as jsxs30 } from "react/jsx-runtime";
var availableLibraries = [
  {
    id: "ai-research",
    name: "AI Research Papers",
    emoji: "\u{1F916}",
    description: "Collection of AI and ML research papers"
  },
  {
    id: "web-dev",
    name: "Web Development Resources",
    emoji: "\u{1F310}",
    description: "Frontend and backend development guides"
  },
  {
    id: "ui-design",
    name: "UI Design Patterns",
    emoji: "\u{1F3A8}",
    description: "Common UI/UX design patterns and examples"
  }
];
function LinkLibraryDialog({ open, onOpenChange }) {
  let [searchQuery, setSearchQuery] = React34.useState(""), [selectedLibraries, setSelectedLibraries] = React34.useState([]), filteredLibraries = availableLibraries.filter(
    (library) => library.name.toLowerCase().includes(searchQuery.toLowerCase())
  ), toggleLibrary = (libraryId) => {
    setSelectedLibraries(
      (prev) => prev.includes(libraryId) ? prev.filter((id) => id !== libraryId) : [...prev, libraryId]
    );
  }, handleSave = () => {
    console.log("Linking libraries:", selectedLibraries), onOpenChange?.(!1);
  };
  return /* @__PURE__ */ jsx41(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs30(DialogContent, { className: "max-w-md", children: [
    /* @__PURE__ */ jsx41(DialogHeader, { children: /* @__PURE__ */ jsx41(DialogTitle, { children: "Link Library" }) }),
    /* @__PURE__ */ jsxs30("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs30("div", { className: "relative", children: [
        /* @__PURE__ */ jsx41(Search4, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx41(
          Input,
          {
            placeholder: "Search libraries...",
            className: "pl-8",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsx41("div", { className: "space-y-2", children: filteredLibraries.map((library) => /* @__PURE__ */ jsxs30(
        "button",
        {
          onClick: () => toggleLibrary(library.id),
          className: `w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-accent ${selectedLibraries.includes(library.id) ? "border-primary bg-primary/5" : "border-border"}`,
          children: [
            /* @__PURE__ */ jsx41("div", { className: "text-2xl", children: library.emoji }),
            /* @__PURE__ */ jsxs30("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx41("div", { className: "font-medium", children: library.name }),
              /* @__PURE__ */ jsx41("div", { className: "text-sm text-muted-foreground truncate", children: library.description })
            ] }),
            selectedLibraries.includes(library.id) && /* @__PURE__ */ jsx41(Check3, { className: "h-4 w-4 text-primary" })
          ]
        },
        library.id
      )) }),
      /* @__PURE__ */ jsxs30("div", { className: "flex justify-end gap-2 pt-4", children: [
        /* @__PURE__ */ jsx41(Button, { variant: "outline", onClick: () => onOpenChange?.(!1), children: "Cancel" }),
        /* @__PURE__ */ jsxs30(Button, { onClick: handleSave, children: [
          "Link Selected (",
          selectedLibraries.length,
          ")"
        ] })
      ] })
    ] })
  ] }) });
}

// app/components/move-to-dialog.tsx
import * as React35 from "react";
import { ChevronRight as ChevronRight3, FolderTree, Plus as Plus2 } from "lucide-react";
import { jsx as jsx42, jsxs as jsxs31 } from "react/jsx-runtime";
function MoveToDialog({ open, onOpenChange }) {
  let { workspaces: workspaces2, addPage } = useWorkspaces(), { toast: toast2 } = useToast(), [selectedWorkspace, setSelectedWorkspace] = React35.useState(null), handleMove = () => {
    selectedWorkspace && (toast2({
      description: "Page moved successfully"
    }), onOpenChange?.(!1));
  }, handleCreateWorkspace = () => {
    let newPage = addPage();
    setSelectedWorkspace(newPage.id);
  };
  return /* @__PURE__ */ jsx42(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs31(DialogContent, { className: "max-w-md", children: [
    /* @__PURE__ */ jsx42(DialogHeader, { children: /* @__PURE__ */ jsx42(DialogTitle, { children: "Move to" }) }),
    /* @__PURE__ */ jsx42(ScrollArea, { className: "h-[300px] pr-4", children: /* @__PURE__ */ jsx42("div", { className: "space-y-2", children: workspaces2.map((workspace) => /* @__PURE__ */ jsxs31(
      "button",
      {
        onClick: () => setSelectedWorkspace(workspace.id),
        className: `w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-accent ${selectedWorkspace === workspace.id ? "border-primary bg-primary/5" : "border-border"}`,
        children: [
          /* @__PURE__ */ jsx42("div", { className: "text-2xl", children: workspace.emoji }),
          /* @__PURE__ */ jsxs31("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx42("div", { className: "font-medium", children: workspace.name }),
            /* @__PURE__ */ jsxs31("div", { className: "text-sm text-muted-foreground truncate", children: [
              workspace.pages.length,
              " pages"
            ] })
          ] }),
          /* @__PURE__ */ jsx42(ChevronRight3, { className: "h-4 w-4 text-muted-foreground" })
        ]
      },
      workspace.id
    )) }) }),
    /* @__PURE__ */ jsxs31("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs31(
        Button,
        {
          variant: "outline",
          className: "w-full justify-start gap-2",
          onClick: handleCreateWorkspace,
          children: [
            /* @__PURE__ */ jsx42(Plus2, { className: "h-4 w-4" }),
            "Create New Workspace"
          ]
        }
      ),
      /* @__PURE__ */ jsxs31("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsx42(Button, { variant: "outline", onClick: () => onOpenChange?.(!1), children: "Cancel" }),
        /* @__PURE__ */ jsxs31(Button, { onClick: handleMove, disabled: !selectedWorkspace, children: [
          /* @__PURE__ */ jsx42(FolderTree, { className: "mr-2 h-4 w-4" }),
          "Move"
        ] })
      ] })
    ] })
  ] }) });
}

// app/components/share-dialog.tsx
import * as React36 from "react";
import { Check as Check4, Copy, Crown, Plus as Plus3, Search as Search5 } from "lucide-react";
import { Fragment as Fragment5, jsx as jsx43, jsxs as jsxs32 } from "react/jsx-runtime";
var owner = {
  name: "You",
  email: "you@example.com",
  role: "Owner",
  lastActive: "Active now",
  avatar: "https://github.com/shadcn.png"
}, people = [
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Editor",
    lastActive: "2 hours ago",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Viewer",
    lastActive: "3 days ago",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Whitney Francis",
    email: "whitney.francis@example.com",
    role: "Editor",
    lastActive: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];
function ShareDialog({ open, onOpenChange }) {
  let [copied, setCopied] = React36.useState(!1), [searchQuery, setSearchQuery] = React36.useState("");
  return /* @__PURE__ */ jsx43(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs32(DialogContent, { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsx43(DialogHeader, { children: /* @__PURE__ */ jsx43(DialogTitle, { children: "Share Document" }) }),
    /* @__PURE__ */ jsxs32("div", { className: "mt-4 space-y-4", children: [
      /* @__PURE__ */ jsx43("div", { className: "rounded-lg border p-3", children: /* @__PURE__ */ jsxs32("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs32("div", { children: [
          /* @__PURE__ */ jsx43("h3", { className: "text-sm font-medium", children: "Share via link" }),
          /* @__PURE__ */ jsx43("p", { className: "text-sm text-muted-foreground", children: "Anyone with the link can view" })
        ] }),
        /* @__PURE__ */ jsx43(Button, { variant: "outline", size: "sm", onClick: () => {
          navigator.clipboard.writeText(window.location.href), setCopied(!0), setTimeout(() => setCopied(!1), 2e3);
        }, children: copied ? /* @__PURE__ */ jsxs32(Fragment5, { children: [
          /* @__PURE__ */ jsx43(Check4, { className: "mr-2 h-4 w-4" }),
          "Copied!"
        ] }) : /* @__PURE__ */ jsxs32(Fragment5, { children: [
          /* @__PURE__ */ jsx43(Copy, { className: "mr-2 h-4 w-4" }),
          "Copy link"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxs32("div", { children: [
        /* @__PURE__ */ jsxs32("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx43("h3", { className: "text-sm font-medium", children: "Share with people" }),
          /* @__PURE__ */ jsxs32("div", { className: "mt-2 flex gap-2", children: [
            /* @__PURE__ */ jsxs32("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsx43(Search5, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsx43(
                Input,
                {
                  placeholder: "Search by name or email...",
                  className: "pl-8",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs32(Button, { children: [
              /* @__PURE__ */ jsx43(Plus3, { className: "mr-2 h-4 w-4" }),
              "Invite people"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx43("div", { className: "rounded-lg border", children: /* @__PURE__ */ jsxs32("table", { className: "min-w-full divide-y divide-border", children: [
          /* @__PURE__ */ jsx43("thead", { children: /* @__PURE__ */ jsxs32("tr", { children: [
            /* @__PURE__ */ jsx43("th", { scope: "col", className: "py-3.5 pl-4 pr-3 text-left text-sm font-medium text-muted-foreground", children: "Name" }),
            /* @__PURE__ */ jsx43("th", { scope: "col", className: "px-3 py-3.5 text-left text-sm font-medium text-muted-foreground", children: "Access" }),
            /* @__PURE__ */ jsx43("th", { scope: "col", className: "px-3 py-3.5 text-left text-sm font-medium text-muted-foreground", children: "Last active" }),
            /* @__PURE__ */ jsx43("th", { scope: "col", className: "relative py-3.5 pl-3 pr-4", children: /* @__PURE__ */ jsx43("span", { className: "sr-only", children: "Actions" }) })
          ] }) }),
          /* @__PURE__ */ jsxs32("tbody", { className: "divide-y divide-border", children: [
            /* @__PURE__ */ jsxs32("tr", { className: "bg-muted/30", children: [
              /* @__PURE__ */ jsx43("td", { className: "whitespace-nowrap py-4 pl-4 pr-3", children: /* @__PURE__ */ jsxs32("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx43(
                  "img",
                  {
                    src: owner.avatar,
                    alt: "",
                    className: "h-8 w-8 rounded-full"
                  }
                ),
                /* @__PURE__ */ jsxs32("div", { children: [
                  /* @__PURE__ */ jsx43("div", { className: "font-medium", children: owner.name }),
                  /* @__PURE__ */ jsx43("div", { className: "text-sm text-muted-foreground", children: owner.email })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx43("td", { className: "whitespace-nowrap px-3 py-4", children: /* @__PURE__ */ jsxs32("div", { className: "flex items-center gap-2 text-sm font-medium", children: [
                /* @__PURE__ */ jsx43(Crown, { className: "h-4 w-4 text-amber-500" }),
                "Owner"
              ] }) }),
              /* @__PURE__ */ jsx43("td", { className: "whitespace-nowrap px-3 py-4 text-sm text-muted-foreground", children: owner.lastActive }),
              /* @__PURE__ */ jsx43("td", { className: "whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm" })
            ] }),
            people.map((person) => /* @__PURE__ */ jsxs32("tr", { children: [
              /* @__PURE__ */ jsx43("td", { className: "whitespace-nowrap py-4 pl-4 pr-3", children: /* @__PURE__ */ jsxs32("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx43(
                  "img",
                  {
                    src: person.avatar,
                    alt: "",
                    className: "h-8 w-8 rounded-full"
                  }
                ),
                /* @__PURE__ */ jsxs32("div", { children: [
                  /* @__PURE__ */ jsx43("div", { className: "font-medium", children: person.name }),
                  /* @__PURE__ */ jsx43("div", { className: "text-sm text-muted-foreground", children: person.email })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx43("td", { className: "whitespace-nowrap px-3 py-4", children: /* @__PURE__ */ jsxs32(
                "select",
                {
                  className: "w-24 rounded-md border-0 bg-transparent py-1.5 text-sm ring-1 ring-inset ring-border focus:ring-2 focus:ring-inset focus:ring-ring",
                  defaultValue: person.role.toLowerCase(),
                  children: [
                    /* @__PURE__ */ jsx43("option", { value: "viewer", children: "Viewer" }),
                    /* @__PURE__ */ jsx43("option", { value: "editor", children: "Editor" }),
                    /* @__PURE__ */ jsx43("option", { value: "admin", children: "Admin" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx43("td", { className: "whitespace-nowrap px-3 py-4 text-sm text-muted-foreground", children: person.lastActive }),
              /* @__PURE__ */ jsx43("td", { className: "whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm", children: /* @__PURE__ */ jsx43(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-destructive hover:text-destructive",
                  children: "Remove"
                }
              ) })
            ] }, person.email))
          ] })
        ] }) })
      ] })
    ] })
  ] }) });
}

// app/components/version-history-dialog.tsx
import * as React37 from "react";
import { Check as Check5, Clock as Clock2, RotateCcw } from "lucide-react";
import { jsx as jsx44, jsxs as jsxs33 } from "react/jsx-runtime";
var versions = [
  {
    id: "v1",
    timestamp: new Date(2024, 2, 15, 14, 30),
    author: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png"
    },
    changes: [
      "Updated project documentation",
      "Added new section on deployment"
    ]
  },
  {
    id: "v2",
    timestamp: new Date(2024, 2, 15, 10, 15),
    author: {
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    changes: [
      "Fixed typos in introduction",
      "Restructured content hierarchy"
    ]
  },
  {
    id: "v3",
    timestamp: new Date(2024, 2, 14, 16, 45),
    author: {
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    changes: [
      "Initial document creation",
      "Added basic structure and content"
    ]
  }
];
function VersionHistoryDialog({ open, onOpenChange }) {
  let { toast: toast2 } = useToast(), [selectedVersion, setSelectedVersion] = React37.useState(null), handleRestore = () => {
    selectedVersion && (toast2({
      description: "Version restored successfully"
    }), onOpenChange?.(!1));
  };
  return /* @__PURE__ */ jsx44(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs33(DialogContent, { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsx44(DialogHeader, { children: /* @__PURE__ */ jsx44(DialogTitle, { children: "Version History" }) }),
    /* @__PURE__ */ jsx44(ScrollArea, { className: "h-[400px] pr-4", children: /* @__PURE__ */ jsxs33("div", { className: "relative", children: [
      /* @__PURE__ */ jsx44("div", { className: "absolute left-8 top-0 bottom-0 w-px bg-border" }),
      /* @__PURE__ */ jsx44("div", { className: "space-y-8", children: versions.map((version) => /* @__PURE__ */ jsx44("div", { className: "relative", children: /* @__PURE__ */ jsxs33(
        "button",
        {
          onClick: () => setSelectedVersion(version.id),
          className: `w-full group rounded-lg border p-4 text-left transition-colors hover:bg-accent ${selectedVersion === version.id ? "border-primary bg-primary/5" : "border-border"}`,
          children: [
            /* @__PURE__ */ jsx44("div", { className: "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full border bg-background", children: /* @__PURE__ */ jsx44(Clock2, { className: "h-3 w-3 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxs33("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs33("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx44(
                  "img",
                  {
                    src: version.author.avatar,
                    alt: "",
                    className: "h-8 w-8 rounded-full"
                  }
                ),
                /* @__PURE__ */ jsxs33("div", { children: [
                  /* @__PURE__ */ jsx44("div", { className: "font-medium", children: version.author.name }),
                  /* @__PURE__ */ jsx44("div", { className: "text-sm text-muted-foreground", children: version.timestamp.toLocaleString() })
                ] })
              ] }),
              selectedVersion === version.id && /* @__PURE__ */ jsx44(Check5, { className: "h-4 w-4 text-primary" })
            ] }),
            /* @__PURE__ */ jsx44("div", { className: "mt-2 space-y-1", children: version.changes.map((change, index) => /* @__PURE__ */ jsxs33(
              "div",
              {
                className: "text-sm text-muted-foreground",
                children: [
                  "\u2022 ",
                  change
                ]
              },
              index
            )) })
          ]
        }
      ) }, version.id)) })
    ] }) }),
    /* @__PURE__ */ jsxs33("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx44(Button, { variant: "outline", onClick: () => onOpenChange?.(!1), children: "Cancel" }),
      /* @__PURE__ */ jsxs33(
        Button,
        {
          onClick: handleRestore,
          disabled: !selectedVersion,
          children: [
            /* @__PURE__ */ jsx44(RotateCcw, { className: "mr-2 h-4 w-4" }),
            "Restore Version"
          ]
        }
      )
    ] })
  ] }) });
}

// app/components/nav-actions.tsx
import { Fragment as Fragment6, jsx as jsx45, jsxs as jsxs34 } from "react/jsx-runtime";
var linkedLibraries = [
  {
    id: "react-docs",
    name: "React Documentation",
    emoji: "\u{1F4DA}"
  },
  {
    id: "design-system",
    name: "Design System Guidelines",
    emoji: "\u{1F3A8}"
  }
], data2 = [
  [
    {
      label: "Copy Link",
      icon: LinkIcon,
      action: async () => (await navigator.clipboard.writeText(window.location.href), "Link copied to clipboard")
    },
    {
      label: "Duplicate",
      icon: Copy2,
      action: (id, addPage) => ({ id: addPage().id, message: "Page duplicated successfully" })
    },
    {
      label: "Move to",
      icon: FolderTree2,
      dialog: "moveTo"
    }
  ],
  [
    {
      label: "Undo",
      icon: CornerUpLeft,
      action: () => "Changes undone"
    },
    {
      label: "Version History",
      icon: GalleryVerticalEnd,
      dialog: "versionHistory"
    },
    {
      label: "Export",
      icon: Download3,
      dialog: "export"
    }
  ],
  [
    {
      label: "Move to Archive",
      icon: Archive3,
      className: "text-destructive hover:text-destructive",
      action: () => "Page moved to archive"
    }
  ]
];
function NavActions() {
  let { id } = useParams(), navigate = useNavigate2(), { toast: toast2 } = useToast(), { isBookmarked, addBookmark, removeBookmark } = useBookmarks(), { addPage } = useWorkspaces(), [isOpen, setIsOpen] = React38.useState(!1), [shareOpen, setShareOpen] = React38.useState(!1), [infoOpen, setInfoOpen] = React38.useState(!1), [aiChatOpen, setAiChatOpen] = React38.useState(!1), [linkLibraryOpen, setLinkLibraryOpen] = React38.useState(!1), [moveToOpen, setMoveToOpen] = React38.useState(!1), [versionHistoryOpen, setVersionHistoryOpen] = React38.useState(!1), [exportOpen, setExportOpen] = React38.useState(!1), bookmarked = id ? isBookmarked(id) : !1, toggleBookmark = React38.useCallback(() => {
    id && (bookmarked ? removeBookmark(id) : addBookmark(id));
  }, [id, bookmarked, addBookmark, removeBookmark]), handleAction = async (action12, dialog) => {
    if (dialog) {
      switch (dialog) {
        case "moveTo":
          setMoveToOpen(!0);
          return;
        case "versionHistory":
          setVersionHistoryOpen(!0);
          return;
        case "export":
          setExportOpen(!0);
          return;
      }
      return;
    }
    if (action12)
      try {
        if (typeof action12 == "function") {
          let result = await action12(id, addPage);
          typeof result == "string" ? toast2({
            description: result
          }) : result?.id && (navigate(`/pages/${result.id}`), toast2({
            description: result.message
          }));
        }
      } catch {
        toast2({
          variant: "destructive",
          description: "An error occurred while performing this action."
        });
      }
  };
  return React38.useEffect(() => {
    setIsOpen(!0);
  }, []), /* @__PURE__ */ jsxs34(Fragment6, { children: [
    /* @__PURE__ */ jsx45(ShareDialog, { open: shareOpen, onOpenChange: setShareOpen }),
    /* @__PURE__ */ jsx45(InfoDialog, { open: infoOpen, onOpenChange: setInfoOpen }),
    /* @__PURE__ */ jsx45(DocumentAIChat, { open: aiChatOpen, onOpenChange: setAiChatOpen, documentTitle: "Project Documentation" }),
    /* @__PURE__ */ jsx45(LinkLibraryDialog, { open: linkLibraryOpen, onOpenChange: setLinkLibraryOpen }),
    /* @__PURE__ */ jsx45(MoveToDialog, { open: moveToOpen, onOpenChange: setMoveToOpen }),
    /* @__PURE__ */ jsx45(VersionHistoryDialog, { open: versionHistoryOpen, onOpenChange: setVersionHistoryOpen }),
    /* @__PURE__ */ jsx45(ExportDialog, { open: exportOpen, onOpenChange: setExportOpen }),
    /* @__PURE__ */ jsxs34("div", { className: "flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsx45("div", { className: "hidden font-medium text-muted-foreground md:inline-block", children: "Edit Oct 08" }),
      /* @__PURE__ */ jsxs34("div", { className: "hidden md:flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs34(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-7 w-7",
            onClick: () => setInfoOpen(!0),
            children: [
              /* @__PURE__ */ jsx45(Info, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx45("span", { className: "sr-only", children: "Info" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs34(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-7 w-7",
            onClick: () => setAiChatOpen(!0),
            children: [
              /* @__PURE__ */ jsx45(Sparkles4, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx45("span", { className: "sr-only", children: "Ask AI" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs34(DropdownMenu, { children: [
          /* @__PURE__ */ jsx45(DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ jsxs34(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-7 w-7",
              children: [
                /* @__PURE__ */ jsx45(BookOpen, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx45("span", { className: "sr-only", children: "Library" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs34(DropdownMenuContent, { align: "end", className: "w-56", children: [
            /* @__PURE__ */ jsxs34("div", { className: "px-2 py-1.5", children: [
              /* @__PURE__ */ jsx45("h4", { className: "text-sm font-medium", children: "Linked Libraries" }),
              /* @__PURE__ */ jsx45("p", { className: "text-xs text-muted-foreground", children: "Libraries connected to this document" })
            ] }),
            /* @__PURE__ */ jsx45(DropdownMenuSeparator, {}),
            linkedLibraries.map((library) => /* @__PURE__ */ jsx45(DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ jsxs34(Link4, { to: `/library/${library.id}`, className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx45("span", { className: "text-base", children: library.emoji }),
              /* @__PURE__ */ jsx45("span", { children: library.name })
            ] }) }, library.id)),
            /* @__PURE__ */ jsx45(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxs34(DropdownMenuItem, { onSelect: () => setLinkLibraryOpen(!0), children: [
              /* @__PURE__ */ jsx45(LinkIcon, { className: "h-4 w-4 mr-2" }),
              "Link Library"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs34(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-7 w-7",
            onClick: () => setShareOpen(!0),
            children: [
              /* @__PURE__ */ jsx45(Share2, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx45("span", { className: "sr-only", children: "Share" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs34(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "h-7 w-7",
          onClick: toggleBookmark,
          children: [
            bookmarked ? /* @__PURE__ */ jsx45(BookmarkCheck, { className: "h-4 w-4 fill-current" }) : /* @__PURE__ */ jsx45(Bookmark, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx45("span", { className: "sr-only", children: "Bookmark" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs34(Popover, { open: isOpen, onOpenChange: setIsOpen, children: [
        /* @__PURE__ */ jsx45(PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ jsxs34(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-7 w-7 data-[state=open]:bg-accent",
            children: [
              /* @__PURE__ */ jsx45(MoreHorizontal4, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx45("span", { className: "sr-only", children: "More options" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx45(
          PopoverContent,
          {
            className: "w-56 overflow-hidden rounded-lg p-0",
            align: "end",
            children: /* @__PURE__ */ jsx45(Sidebar, { collapsible: "none", className: "bg-transparent", children: /* @__PURE__ */ jsx45(SidebarContent, { children: data2.map((group, index) => /* @__PURE__ */ jsx45(SidebarGroup, { className: "border-b last:border-none", children: /* @__PURE__ */ jsx45(SidebarGroupContent, { className: "gap-0", children: /* @__PURE__ */ jsx45(SidebarMenu, { children: group.map((item, index2) => /* @__PURE__ */ jsx45(SidebarMenuItem, { children: /* @__PURE__ */ jsxs34(
              SidebarMenuButton,
              {
                className: item.className,
                onClick: () => handleAction(item.action, item.dialog),
                children: [
                  /* @__PURE__ */ jsx45(item.icon, {}),
                  " ",
                  /* @__PURE__ */ jsx45("span", { children: item.label })
                ]
              }
            ) }, index2)) }) }) }, index)) }) })
          }
        )
      ] })
    ] })
  ] });
}

// app/components/ui/breadcrumb.tsx
import * as React39 from "react";
import { Slot as Slot3 } from "@radix-ui/react-slot";
import { ChevronRight as ChevronRight4, MoreHorizontal as MoreHorizontal5 } from "lucide-react";
import { jsx as jsx46, jsxs as jsxs35 } from "react/jsx-runtime";
var Breadcrumb = React39.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx46("nav", { ref, "aria-label": "breadcrumb", ...props }));
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = React39.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx46(
  "ol",
  {
    ref,
    className: cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    ),
    ...props
  }
));
BreadcrumbList.displayName = "BreadcrumbList";
var BreadcrumbItem = React39.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx46(
  "li",
  {
    ref,
    className: cn("inline-flex items-center gap-1.5", className),
    ...props
  }
));
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = React39.forwardRef(({ asChild, className, ...props }, ref) => /* @__PURE__ */ jsx46(
  asChild ? Slot3 : "a",
  {
    ref,
    className: cn("transition-colors hover:text-foreground", className),
    ...props
  }
));
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbInput = React39.forwardRef(({ value, onChange }, ref) => /* @__PURE__ */ jsx46(
  Input,
  {
    ref,
    value,
    onChange: (e) => onChange?.(e.target.value),
    className: "h-auto border-none bg-transparent px-0 text-base font-semibold shadow-none focus-visible:ring-0"
  }
));
BreadcrumbInput.displayName = "BreadcrumbInput";
var BreadcrumbPage = React39.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx46(
  "span",
  {
    ref,
    role: "link",
    "aria-disabled": "true",
    "aria-current": "page",
    className: cn("font-normal text-foreground", className),
    ...props
  }
));
BreadcrumbPage.displayName = "BreadcrumbPage";
var BreadcrumbSeparator = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx46(
  "li",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className),
    ...props,
    children: children ?? /* @__PURE__ */ jsx46(ChevronRight4, {})
  }
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
var BreadcrumbEllipsis = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs35(
  "span",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("flex h-9 w-9 items-center justify-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx46(MoreHorizontal5, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx46("span", { className: "sr-only", children: "More" })
    ]
  }
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

// app/components/layout.tsx
import { Fragment as Fragment7, jsx as jsx47, jsxs as jsxs36 } from "react/jsx-runtime";
function Layout({
  children,
  title,
  emoji = "\u{1F4C4}",
  onTitleChange,
  onEmojiChange,
  minimal = !1
}) {
  return /* @__PURE__ */ jsxs36(SidebarProvider, { children: [
    /* @__PURE__ */ jsx47(AppSidebar, { onPageTitleChange: onTitleChange }),
    /* @__PURE__ */ jsxs36(SidebarInset, { children: [
      /* @__PURE__ */ jsx47("header", { className: "flex h-14 shrink-0 items-center", children: minimal ? /* @__PURE__ */ jsx47("div", { className: "px-3", children: /* @__PURE__ */ jsx47(SidebarTrigger, {}) }) : /* @__PURE__ */ jsxs36(Fragment7, { children: [
        /* @__PURE__ */ jsxs36("div", { className: "flex flex-1 items-center gap-2 px-3", children: [
          /* @__PURE__ */ jsx47(SidebarTrigger, {}),
          /* @__PURE__ */ jsx47(Separator2, { orientation: "vertical", className: "mr-2 h-4" }),
          /* @__PURE__ */ jsx47(Breadcrumb, { children: /* @__PURE__ */ jsx47(BreadcrumbList, { children: /* @__PURE__ */ jsxs36(BreadcrumbItem, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx47(EmojiPicker, { value: emoji, onChange: onEmojiChange }),
            /* @__PURE__ */ jsx47(
              BreadcrumbInput,
              {
                value: title,
                onChange: onTitleChange
              }
            )
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsx47("div", { className: "ml-auto px-3", children: /* @__PURE__ */ jsx47(NavActions, {}) })
      ] }) }),
      /* @__PURE__ */ jsx47("div", { className: "flex flex-1 flex-col gap-4 px-4 py-10", children: /* @__PURE__ */ jsx47("div", { className: "mx-auto w-full max-w-3xl", children }) })
    ] })
  ] });
}

// app/components/editor.tsx
import * as React41 from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List as List2,
  ListOrdered,
  Quote,
  Strikethrough
} from "lucide-react";

// app/components/ai-suggestions.tsx
import * as React40 from "react";
import { Bot as Bot2, ChevronDown, Lightbulb, Sparkles as Sparkles5, X as X5 } from "lucide-react";
import { motion as motion2, AnimatePresence as AnimatePresence2 } from "framer-motion";
import { jsx as jsx48, jsxs as jsxs37 } from "react/jsx-runtime";
function getLetterGradeStyle(grade) {
  switch (grade) {
    case "A":
      return "text-emerald-500 bg-emerald-500/10";
    case "B":
      return "text-blue-500 bg-blue-500/10";
    case "C":
      return "text-amber-500 bg-amber-500/10";
    case "D":
      return "text-orange-500 bg-orange-500/10";
    case "F":
      return "text-red-500 bg-red-500/10";
    default:
      return "text-primary bg-primary/10";
  }
}
function getLetterGrade(score) {
  return score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F";
}
function AiSuggestions({ content }) {
  let [suggestions, setSuggestions] = React40.useState([]), [loading, setLoading] = React40.useState(!0), [score] = React40.useState(87), [openSuggestion, setOpenSuggestion] = React40.useState(null), letterGrade = getLetterGrade(score), gradeStyle = getLetterGradeStyle(letterGrade);
  return React40.useEffect(() => {
    let timer = setTimeout(() => {
      let newSuggestions = [
        {
          id: "1",
          type: "improvement",
          title: "Add More Examples",
          content: {
            summary: "Your points need stronger support through concrete examples.",
            highlights: [
              "Add real-world case studies",
              "Include statistical data",
              "Share relevant experiences",
              "Reference expert opinions"
            ]
          }
        },
        {
          id: "2",
          type: "insight",
          title: "Enhance Introduction",
          content: {
            summary: "Make your introduction more engaging and attention-grabbing.",
            highlights: [
              "Start with a surprising statistic",
              "Open with a thought-provoking question",
              "Begin with a relevant anecdote",
              "Present a compelling problem"
            ]
          }
        },
        {
          id: "3",
          type: "enhancement",
          title: "Improve Readability",
          content: {
            summary: "Break down content into more digestible sections.",
            highlights: [
              "Keep paragraphs to 3-4 sentences",
              "Use bullet points strategically",
              "Add clear subheadings",
              "Increase white space"
            ]
          }
        },
        {
          id: "4",
          type: "improvement",
          title: "Smooth Transitions",
          content: {
            summary: "Create better flow between topics and sections.",
            highlights: [
              "Add transitional phrases",
              "Connect ideas explicitly",
              "Summarize before new topics",
              "Use logical bridges"
            ]
          }
        },
        {
          id: "5",
          type: "insight",
          title: "Strengthen Arguments",
          content: {
            summary: "Support claims with authoritative sources and research.",
            highlights: [
              "Cite recent studies",
              "Include expert quotes",
              "Add industry statistics",
              "Reference peer-reviewed papers"
            ]
          }
        }
      ];
      setSuggestions(newSuggestions), setOpenSuggestion(newSuggestions[0].id), setLoading(!1);
    }, 1500);
    return () => clearTimeout(timer);
  }, [content]), loading ? /* @__PURE__ */ jsx48(
    motion2.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "rounded-lg bg-muted/50 p-4",
      children: /* @__PURE__ */ jsxs37("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx48(Bot2, { className: "h-4 w-4 animate-pulse" }),
        /* @__PURE__ */ jsx48("p", { children: "Analyzing content..." })
      ] })
    }
  ) : /* @__PURE__ */ jsx48(ScrollArea, { className: "h-[calc(100vh-12rem)]", children: /* @__PURE__ */ jsxs37(
    motion2.div,
    {
      className: "space-y-4 pr-4",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
      children: [
        /* @__PURE__ */ jsx48(
          motion2.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.4, delay: 0.1 },
            className: "rounded-lg bg-muted/50 p-6",
            children: /* @__PURE__ */ jsxs37("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx48("div", { children: /* @__PURE__ */ jsxs37(
                motion2.p,
                {
                  className: "text-2xl font-bold tracking-tight",
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { duration: 0.4, delay: 0.3 },
                  children: [
                    score,
                    "%"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx48(
                motion2.div,
                {
                  className: cn("flex h-14 w-14 items-center justify-center rounded-full transition-colors", gradeStyle),
                  initial: { scale: 0 },
                  animate: { scale: 1 },
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.4
                  },
                  children: /* @__PURE__ */ jsx48("span", { className: "text-2xl font-bold", children: letterGrade })
                }
              )
            ] })
          }
        ),
        suggestions.map((suggestion, index) => /* @__PURE__ */ jsx48(
          motion2.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, delay: 0.1 * (index + 2) },
            children: /* @__PURE__ */ jsx48(
              Collapsible,
              {
                open: openSuggestion === suggestion.id,
                onOpenChange: (open) => setOpenSuggestion(open ? suggestion.id : null),
                children: /* @__PURE__ */ jsxs37("div", { className: "rounded-lg bg-muted/50", children: [
                  /* @__PURE__ */ jsxs37(CollapsibleTrigger2, { className: "flex w-full items-center justify-between p-4", children: [
                    /* @__PURE__ */ jsxs37("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxs37(
                        motion2.div,
                        {
                          whileHover: { scale: 1.1 },
                          whileTap: { scale: 0.95 },
                          children: [
                            suggestion.type === "improvement" && /* @__PURE__ */ jsx48(Sparkles5, { className: "h-4 w-4 text-blue-500" }),
                            suggestion.type === "insight" && /* @__PURE__ */ jsx48(Lightbulb, { className: "h-4 w-4 text-amber-500" }),
                            suggestion.type === "enhancement" && /* @__PURE__ */ jsx48(Bot2, { className: "h-4 w-4 text-emerald-500" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx48("span", { className: "text-sm font-medium", children: suggestion.title })
                    ] }),
                    /* @__PURE__ */ jsx48(
                      motion2.div,
                      {
                        animate: { rotate: openSuggestion === suggestion.id ? 180 : 0 },
                        transition: { duration: 0.2 },
                        children: /* @__PURE__ */ jsx48(ChevronDown, { className: "h-4 w-4 text-muted-foreground" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx48(CollapsibleContent2, { children: /* @__PURE__ */ jsx48(AnimatePresence2, { children: openSuggestion === suggestion.id && /* @__PURE__ */ jsx48(
                    motion2.div,
                    {
                      initial: { height: 0, opacity: 0 },
                      animate: { height: "auto", opacity: 1 },
                      exit: { height: 0, opacity: 0 },
                      transition: { duration: 0.2 },
                      className: "border-t border-border/50",
                      children: /* @__PURE__ */ jsxs37("div", { className: "p-4", children: [
                        /* @__PURE__ */ jsx48("p", { className: "text-sm text-muted-foreground mb-3", children: suggestion.content.summary }),
                        /* @__PURE__ */ jsx48("div", { className: "space-y-2", children: suggestion.content.highlights.map((highlight, i) => /* @__PURE__ */ jsxs37(
                          "div",
                          {
                            className: "flex items-center gap-2 text-sm",
                            children: [
                              /* @__PURE__ */ jsx48("div", { className: "h-1.5 w-1.5 rounded-full bg-primary/50" }),
                              /* @__PURE__ */ jsx48("span", { className: "font-medium text-primary", children: highlight })
                            ]
                          },
                          i
                        )) }),
                        /* @__PURE__ */ jsxs37(
                          motion2.div,
                          {
                            className: "mt-4 flex gap-2",
                            initial: { opacity: 0, y: 10 },
                            animate: { opacity: 1, y: 0 },
                            transition: { delay: 0.1 },
                            children: [
                              /* @__PURE__ */ jsx48(
                                Button,
                                {
                                  size: "sm",
                                  className: "w-full bg-primary/10 text-primary hover:bg-primary/20",
                                  children: "Accept Suggestion"
                                }
                              ),
                              /* @__PURE__ */ jsx48(
                                Button,
                                {
                                  size: "sm",
                                  variant: "ghost",
                                  className: "w-8 p-0 text-muted-foreground hover:text-foreground",
                                  children: /* @__PURE__ */ jsx48(X5, { className: "h-4 w-4" })
                                }
                              )
                            ]
                          }
                        )
                      ] })
                    }
                  ) }) })
                ] })
              }
            )
          },
          suggestion.id
        ))
      ]
    }
  ) });
}

// app/components/editor.tsx
import { jsx as jsx49, jsxs as jsxs38 } from "react/jsx-runtime";
var MenuButton = ({
  isActive,
  onClick,
  children
}) => /* @__PURE__ */ jsx49(
  Button,
  {
    variant: isActive ? "secondary" : "ghost",
    size: "sm",
    className: "h-7 w-7 p-0",
    onClick,
    children
  }
);
function Editor({ title, onTitleChange }) {
  let [showSuggestions, setShowSuggestions] = React41.useState(!0), editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: !1
      }),
      Heading.configure({
        levels: [1, 2, 3]
      }),
      Highlight,
      TaskList,
      TaskItem.configure({
        nested: !0
      }),
      Placeholder.configure({
        placeholder: ({ node }) => node.type.name === "heading" && node.attrs.level === 1 ? "Untitled" : "Start writing..."
      })
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-full min-h-[500px]"
      }
    },
    onUpdate: ({ editor: editor2 }) => {
      let firstHeading = editor2.getJSON().content?.find(
        (node) => node.type === "heading" && node.attrs.level === 1
      );
      if (firstHeading && onTitleChange) {
        let title2 = firstHeading.content?.[0]?.text || "Untitled";
        onTitleChange(title2);
      }
    }
  });
  return React41.useEffect(() => {
    editor && title && !editor.getText().trim() && editor.commands.setContent([
      {
        type: "heading",
        attrs: { level: 1 },
        content: [{ type: "text", text: title }]
      }
    ]);
  }, [editor, title]), editor ? /* @__PURE__ */ jsxs38("div", { className: "relative flex gap-8", children: [
    /* @__PURE__ */ jsxs38("div", { className: "relative min-h-[500px] w-full max-w-2xl border-none sm:mb-[calc(20vh)]", children: [
      editor && /* @__PURE__ */ jsxs38(
        BubbleMenu,
        {
          className: cn(
            "flex w-fit divide-x divide-border overflow-hidden rounded-lg border border-border bg-background shadow-md"
          ),
          tippyOptions: { duration: 100 },
          editor,
          children: [
            /* @__PURE__ */ jsxs38("div", { className: "flex items-center gap-1 px-1", children: [
              /* @__PURE__ */ jsx49(
                MenuButton,
                {
                  isActive: editor.isActive("heading", { level: 1 }),
                  onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
                  children: /* @__PURE__ */ jsx49(Heading1, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsx49(
                MenuButton,
                {
                  isActive: editor.isActive("heading", { level: 2 }),
                  onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
                  children: /* @__PURE__ */ jsx49(Heading2, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsx49(
                MenuButton,
                {
                  isActive: editor.isActive("heading", { level: 3 }),
                  onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
                  children: /* @__PURE__ */ jsx49(Heading3, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs38("div", { className: "flex items-center gap-1 px-1", children: [
              /* @__PURE__ */ jsx49(
                MenuButton,
                {
                  isActive: editor.isActive("bold"),
                  onClick: () => editor.chain().focus().toggleBold().run(),
                  children: /* @__PURE__ */ jsx49(Bold, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsx49(
                MenuButton,
                {
                  isActive: editor.isActive("italic"),
                  onClick: () => editor.chain().focus().toggleItalic().run(),
                  children: /* @__PURE__ */ jsx49(Italic, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsx49(
                MenuButton,
                {
                  isActive: editor.isActive("strike"),
                  onClick: () => editor.chain().focus().toggleStrike().run(),
                  children: /* @__PURE__ */ jsx49(Strikethrough, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs38("div", { className: "flex items-center gap-1 px-1", children: [
              /* @__PURE__ */ jsx49(
                MenuButton,
                {
                  isActive: editor.isActive("bulletList"),
                  onClick: () => editor.chain().focus().toggleBulletList().run(),
                  children: /* @__PURE__ */ jsx49(List2, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsx49(
                MenuButton,
                {
                  isActive: editor.isActive("orderedList"),
                  onClick: () => editor.chain().focus().toggleOrderedList().run(),
                  children: /* @__PURE__ */ jsx49(ListOrdered, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsx49(
                MenuButton,
                {
                  isActive: editor.isActive("blockquote"),
                  onClick: () => editor.chain().focus().toggleBlockquote().run(),
                  children: /* @__PURE__ */ jsx49(Quote, { className: "h-4 w-4" })
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx49(EditorContent, { editor })
    ] }),
    showSuggestions && /* @__PURE__ */ jsx49("div", { className: "relative hidden w-96 xl:block", children: /* @__PURE__ */ jsx49("div", { className: "fixed right-8 w-96", children: /* @__PURE__ */ jsx49(AiSuggestions, { content: editor.getText() }) }) })
  ] }) : null;
}

// app/routes/getting-started.tsx
import { jsx as jsx50, jsxs as jsxs39 } from "react/jsx-runtime";
var loader5 = async () => {
  let __filename = fileURLToPath(import.meta.url), __dirname = path.dirname(__filename), filePath = path.resolve(__dirname, "../../GETTING_STARTED.md"), content = await fs.readFile(filePath, "utf-8");
  return json9({ content });
};
function GettingStarted() {
  let { title, setTitle } = usePageTitle("getting-started"), { emoji, setEmoji } = usePageEmoji("getting-started");
  return /* @__PURE__ */ jsxs39(
    Layout,
    {
      title,
      emoji,
      onTitleChange: setTitle,
      onEmojiChange: setEmoji,
      children: [
        /* @__PURE__ */ jsx50(Editor, { title, onTitleChange: setTitle }),
        /* @__PURE__ */ jsx50("div", { className: "prose mx-auto p-4", children: /* @__PURE__ */ jsx50(ReactMarkdown, { children: `# Getting Started with Studr

Welcome to Studr! This guide will help you get started with our application and make the most out of its features.

## Overview

Studr is a powerful application designed to help you manage your documents and workspaces efficiently. Whether you're organizing personal notes or collaborating with a team, Studr provides the tools you need to stay organized and productive.

## Key Features

- **Document Management**: Create, update, and organize your documents with ease.
- **Workspaces**: Collaborate with others by creating shared workspaces.
- **Authentication**: Securely log in to access your personalized content.
- **Favorites**: Keep track of your most important documents by adding them to your favorites.
- **Analytics**: Gain insights into your document usage and activity.

## Getting Started

1. **Sign Up or Log In**
   - If you're new to Studr, sign up to create an account. If you already have an account, log in to access your dashboard.

2. **Create a Workspace**
   - Start by creating a workspace for your projects. Workspaces allow you to group related documents together and collaborate with others.

3. **Add Documents**
   - Within a workspace, you can create new documents or upload existing ones. Use the editor to write and format your content.

4. **Organize Your Documents**
   - Use folders and tags to organize your documents for easy access. Add important documents to your favorites for quick retrieval.

5. **Explore Features**
   - Take advantage of Studr's features such as analytics to track your document usage and activity.

## Support

If you have any questions or need assistance, our support team is here to help. Visit our [support page](#) or contact us at support@studr.com.

Thank you for choosing Studr! We hope you enjoy using our application.` }) })
      ]
    }
  );
}

// app/routes/auth.callback.tsx
var auth_callback_exports = {};
__export(auth_callback_exports, {
  loader: () => loader6
});
import { redirect as redirect2 } from "@remix-run/node";
import { createServerClient as createServerClient2 } from "@supabase/auth-helpers-remix";
var loader6 = async ({ request }) => {
  let response = new Response(), code = new URL(request.url).searchParams.get("code");
  return code && await createServerClient2(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { request, response }
  ).auth.exchangeCodeForSession(code), redirect2("/", {
    headers: response.headers
  });
};

// app/routes/auth.register.tsx
var auth_register_exports = {};
__export(auth_register_exports, {
  action: () => action8,
  default: () => RegisterPage,
  loader: () => loader7
});
import { json as json10, redirect as redirect3 } from "@remix-run/node";
import { Form, Link as Link5, useActionData, useNavigation } from "@remix-run/react";
import { createServerClient as createServerClient3 } from "@supabase/auth-helpers-remix";
import { jsx as jsx51, jsxs as jsxs40 } from "react/jsx-runtime";
var loader7 = async ({ request }) => {
  let response = new Response(), supabase = createServerClient3(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { request, response }
  ), {
    data: { session }
  } = await supabase.auth.getSession();
  return session ? redirect3("/") : json10(null, {
    headers: response.headers
  });
}, action8 = async ({ request }) => {
  let response = new Response(), supabase = createServerClient3(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { request, response }
  ), formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), name = formData.get("name");
  if (formData.get("provider") === "google") {
    let { data: data3, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${new URL(request.url).origin}/auth/callback`
      }
    });
    return error ? json10({ error: error.message }, { status: 400 }) : redirect3(data3.url, {
      headers: response.headers
    });
  }
  let { error: signUpError, data: signUpData } = await supabase.auth.signUp({
    email,
    password
  });
  if (signUpError)
    return json10({ error: signUpError.message }, { status: 400 });
  let { error: profileError } = await supabase.from("users").insert([
    {
      id: signUpData.user?.id,
      email,
      name,
      subscription_tier: "free",
      token_usage: 0
    }
  ]);
  return profileError ? json10({ error: profileError.message }, { status: 400 }) : redirect3("/", {
    headers: response.headers
  });
};
function RegisterPage() {
  let actionData = useActionData(), isSubmitting = useNavigation().state === "submitting";
  return /* @__PURE__ */ jsx51("div", { className: "flex min-h-screen flex-col justify-center bg-muted/40", children: /* @__PURE__ */ jsxs40("div", { className: "mx-auto w-full max-w-[350px] space-y-6", children: [
    /* @__PURE__ */ jsxs40("div", { className: "flex flex-col space-y-2 text-center", children: [
      /* @__PURE__ */ jsx51("h1", { className: "text-2xl font-semibold tracking-tight", children: "Create an account" }),
      /* @__PURE__ */ jsx51("p", { className: "text-sm text-muted-foreground", children: "Enter your information to get started" })
    ] }),
    /* @__PURE__ */ jsxs40("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxs40(Form, { method: "post", children: [
        /* @__PURE__ */ jsx51("input", { type: "hidden", name: "provider", value: "google" }),
        /* @__PURE__ */ jsxs40(
          Button,
          {
            type: "submit",
            variant: "outline",
            className: "w-full bg-background",
            disabled: isSubmitting,
            children: [
              /* @__PURE__ */ jsxs40("svg", { className: "mr-2 h-4 w-4", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx51(
                  "path",
                  {
                    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                    fill: "#4285F4"
                  }
                ),
                /* @__PURE__ */ jsx51(
                  "path",
                  {
                    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                    fill: "#34A853"
                  }
                ),
                /* @__PURE__ */ jsx51(
                  "path",
                  {
                    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
                    fill: "#FBBC05"
                  }
                ),
                /* @__PURE__ */ jsx51(
                  "path",
                  {
                    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                    fill: "#EA4335"
                  }
                )
              ] }),
              "Continue with Google"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs40("div", { className: "relative", children: [
        /* @__PURE__ */ jsx51("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx51("span", { className: "w-full border-t" }) }),
        /* @__PURE__ */ jsx51("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsx51("span", { className: "bg-background px-2 text-muted-foreground", children: "Or continue with" }) })
      ] }),
      /* @__PURE__ */ jsxs40(Form, { method: "post", className: "grid gap-4", children: [
        /* @__PURE__ */ jsxs40("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx51(Label2, { htmlFor: "name", children: "Name" }),
          /* @__PURE__ */ jsx51(
            Input,
            {
              id: "name",
              name: "name",
              type: "text",
              autoComplete: "name",
              required: !0
            }
          )
        ] }),
        /* @__PURE__ */ jsxs40("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx51(Label2, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx51(
            Input,
            {
              id: "email",
              name: "email",
              type: "email",
              autoCapitalize: "none",
              autoComplete: "email",
              autoCorrect: "off",
              required: !0
            }
          )
        ] }),
        /* @__PURE__ */ jsxs40("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx51(Label2, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsx51(
            Input,
            {
              id: "password",
              name: "password",
              type: "password",
              autoComplete: "new-password",
              required: !0
            }
          )
        ] }),
        actionData?.error && /* @__PURE__ */ jsx51("div", { className: "text-sm text-red-500", children: actionData.error }),
        /* @__PURE__ */ jsx51(Button, { className: "w-full", disabled: isSubmitting, children: isSubmitting ? "Creating account..." : "Create account" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs40("div", { className: "text-center text-sm", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsx51(
        Link5,
        {
          to: "/auth/login",
          className: "font-medium text-primary hover:underline",
          children: "Sign in"
        }
      )
    ] })
  ] }) });
}

// app/routes/api.ai.chat.tsx
var api_ai_chat_exports = {};
__export(api_ai_chat_exports, {
  action: () => action9
});
import { json as json11 } from "@remix-run/node";

// app/lib/openai.server.ts
import OpenAI from "openai";
var { OPENAI_API_KEY } = getOpenAIEnvVars(), openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});
async function generateAIResponse(messages) {
  try {
    return (await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant focused on helping users improve their documents and writing."
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500
    })).choices[0].message.content;
  } catch (error) {
    throw console.error("OpenAI API error:", error), new Error("Failed to generate AI response");
  }
}

// app/routes/api.ai.chat.tsx
var action9 = async ({ request }) => {
  let { supabase, session, response } = await requireAuth(request), formData = await request.formData(), messages = JSON.parse(formData.get("messages"));
  try {
    let { data: user } = await supabase.from("users").select("token_usage, subscription_tier").eq("id", session.user.id).single();
    if (user?.subscription_tier === "free" && user?.token_usage >= 5e4)
      return json11(
        { error: "Token limit reached. Please upgrade to Pro for unlimited tokens." },
        { status: 429 }
      );
    let aiResponse = await generateAIResponse(messages), tokensUsed = Math.ceil(
      (messages.reduce((acc, msg) => acc + msg.content.length, 0) + (aiResponse?.length || 0)) / 4
    );
    return await supabase.from("users").update({ token_usage: (user?.token_usage || 0) + tokensUsed }).eq("id", session.user.id), json11({ response: aiResponse }, { headers: response.headers });
  } catch (error) {
    return console.error("AI chat error:", error), json11(
      { error: "Failed to generate AI response" },
      { status: 500, headers: response.headers }
    );
  }
};

// app/routes/auth.logout.tsx
var auth_logout_exports = {};
__export(auth_logout_exports, {
  action: () => action10,
  loader: () => loader8
});
import { redirect as redirect4 } from "@remix-run/node";
import { createServerClient as createServerClient4 } from "@supabase/auth-helpers-remix";
var action10 = async ({ request }) => {
  let response = new Response();
  return await createServerClient4(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { request, response }
  ).auth.signOut(), redirect4("/auth/login", {
    headers: response.headers
  });
}, loader8 = async () => redirect4("/");

// app/routes/library.$id.tsx
var library_id_exports = {};
__export(library_id_exports, {
  default: () => LibraryRoute
});
import { useParams as useParams2 } from "@remix-run/react";

// app/components/library-viewer.tsx
import * as React42 from "react";
import { FileText as FileText5 } from "lucide-react";
import { jsx as jsx52, jsxs as jsxs41 } from "react/jsx-runtime";
function LibraryViewer({ item }) {
  let [loading, setLoading] = React42.useState(!0);
  return React42.useEffect(() => {
    let timer = setTimeout(() => {
      setLoading(!1);
    }, 1e3);
    return () => clearTimeout(timer);
  }, [item]), loading ? /* @__PURE__ */ jsx52("div", { className: "flex min-h-[calc(100vh-3.5rem)] items-center justify-center", children: /* @__PURE__ */ jsxs41("div", { className: "rounded-lg border bg-card p-8 text-center shadow-sm", children: [
    /* @__PURE__ */ jsx52("div", { className: "animate-spin text-muted-foreground", children: /* @__PURE__ */ jsx52(FileText5, { className: "h-8 w-8" }) }),
    /* @__PURE__ */ jsx52("p", { className: "mt-4 font-medium", children: "Loading document..." }),
    /* @__PURE__ */ jsx52("p", { className: "mt-1.5 text-sm text-muted-foreground", children: "Please wait while we prepare your content" })
  ] }) }) : /* @__PURE__ */ jsx52("div", { className: "mx-auto max-w-3xl rounded-lg border bg-card p-8 shadow-sm", children: /* @__PURE__ */ jsx52("div", { className: "prose prose-sm sm:prose-base dark:prose-invert", children: /* @__PURE__ */ jsx52("div", { dangerouslySetInnerHTML: { __html: item.content } }) }) });
}

// app/routes/library.$id.tsx
import { jsx as jsx53 } from "react/jsx-runtime";
function LibraryRoute() {
  let { id } = useParams2(), item = ((id2) => ({
    "react-docs": {
      name: "React Documentation",
      type: "url",
      content: `
          <h1>React Documentation</h1>
          <p>React is a JavaScript library for building user interfaces.</p>
          <h2>Getting Started</h2>
          <p>To get started with React, you can create a new project using Create React App:</p>
          <pre><code>npx create-react-app my-app</code></pre>
          <h2>Main Concepts</h2>
          <ul>
            <li>Components</li>
            <li>Props</li>
            <li>State</li>
            <li>Lifecycle Methods</li>
          </ul>
          <p>This is a demo document showcasing how library items can be displayed.</p>
        `
    },
    "design-system": {
      name: "Design System Guidelines",
      type: "file",
      content: `
          <h1>Design System Guidelines</h1>
          <h2>Colors</h2>
          <p>Our design system uses a carefully selected color palette:</p>
          <ul>
            <li>Primary: #0066CC</li>
            <li>Secondary: #6B7280</li>
            <li>Accent: #10B981</li>
          </ul>
          <h2>Typography</h2>
          <p>We use Inter as our primary font family across all applications.</p>
          <h3>Font Sizes</h3>
          <ul>
            <li>Heading 1: 2.25rem</li>
            <li>Heading 2: 1.875rem</li>
            <li>Body: 1rem</li>
          </ul>
          <p>This is a demo document showcasing how library items can be displayed.</p>
        `
    },
    "research-paper": {
      name: "Research Paper: AI in 2024",
      type: "file",
      content: `
          <h1>The State of AI in 2024</h1>
          <p class="lead">A comprehensive overview of artificial intelligence developments.</p>
          <h2>Abstract</h2>
          <p>This paper examines the current state of artificial intelligence and its impact on various industries.</p>
          <h2>Introduction</h2>
          <p>Artificial intelligence has seen remarkable progress in recent years, with breakthroughs in:</p>
          <ul>
            <li>Large Language Models</li>
            <li>Computer Vision</li>
            <li>Robotics</li>
            <li>Healthcare Applications</li>
          </ul>
          <h2>Methodology</h2>
          <p>Our research methodology included analyzing data from multiple sources and conducting interviews with industry experts.</p>
          <p>This is a demo document showcasing how library items can be displayed.</p>
        `
    }
  })[id2] || {
    name: "Unknown Item",
    type: "file",
    content: "<h1>Document Not Found</h1><p>The requested document could not be found in the library.</p>"
  })(id);
  return /* @__PURE__ */ jsx53(Layout, { minimal: !0, title: item.name, children: /* @__PURE__ */ jsx53(LibraryViewer, { item }) });
}

// app/routes/auth.login.tsx
var auth_login_exports = {};
__export(auth_login_exports, {
  action: () => action11,
  default: () => LoginPage,
  loader: () => loader9
});
import { json as json12, redirect as redirect5 } from "@remix-run/node";
import { Form as Form2, Link as Link6, useActionData as useActionData2, useNavigation as useNavigation2 } from "@remix-run/react";
import { createServerClient as createServerClient5 } from "@supabase/auth-helpers-remix";
import { jsx as jsx54, jsxs as jsxs42 } from "react/jsx-runtime";
var loader9 = async ({ request }) => {
  let response = new Response(), supabase = createServerClient5(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { request, response }
  ), {
    data: { session }
  } = await supabase.auth.getSession();
  return session ? redirect5("/") : json12(null, {
    headers: response.headers
  });
}, action11 = async ({ request }) => {
  let response = new Response(), supabase = createServerClient5(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { request, response }
  ), formData = await request.formData(), email = formData.get("email"), password = formData.get("password");
  if (formData.get("provider") === "google") {
    let { data: data3, error: error2 } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${new URL(request.url).origin}/auth/callback`
      }
    });
    return error2 ? json12({ error: error2.message }, { status: 400 }) : redirect5(data3.url, {
      headers: response.headers
    });
  }
  let { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return error ? json12({ error: error.message }, { status: 400 }) : redirect5("/", {
    headers: response.headers
  });
};
function LoginPage() {
  let actionData = useActionData2(), isSubmitting = useNavigation2().state === "submitting";
  return /* @__PURE__ */ jsx54("div", { className: "flex min-h-screen flex-col justify-center bg-muted/40", children: /* @__PURE__ */ jsxs42("div", { className: "mx-auto w-full max-w-[350px] space-y-6", children: [
    /* @__PURE__ */ jsxs42("div", { className: "flex flex-col space-y-2 text-center", children: [
      /* @__PURE__ */ jsx54("h1", { className: "text-2xl font-semibold tracking-tight", children: "Welcome back" }),
      /* @__PURE__ */ jsx54("p", { className: "text-sm text-muted-foreground", children: "Enter your credentials to access your account" })
    ] }),
    /* @__PURE__ */ jsxs42("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxs42(Form2, { method: "post", children: [
        /* @__PURE__ */ jsx54("input", { type: "hidden", name: "provider", value: "google" }),
        /* @__PURE__ */ jsxs42(
          Button,
          {
            type: "submit",
            variant: "outline",
            className: "w-full bg-background",
            disabled: isSubmitting,
            children: [
              /* @__PURE__ */ jsxs42("svg", { className: "mr-2 h-4 w-4", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx54(
                  "path",
                  {
                    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                    fill: "#4285F4"
                  }
                ),
                /* @__PURE__ */ jsx54(
                  "path",
                  {
                    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                    fill: "#34A853"
                  }
                ),
                /* @__PURE__ */ jsx54(
                  "path",
                  {
                    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
                    fill: "#FBBC05"
                  }
                ),
                /* @__PURE__ */ jsx54(
                  "path",
                  {
                    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                    fill: "#EA4335"
                  }
                )
              ] }),
              "Continue with Google"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs42("div", { className: "relative", children: [
        /* @__PURE__ */ jsx54("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx54("span", { className: "w-full border-t" }) }),
        /* @__PURE__ */ jsx54("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsx54("span", { className: "bg-background px-2 text-muted-foreground", children: "Or continue with" }) })
      ] }),
      /* @__PURE__ */ jsxs42(Form2, { method: "post", className: "grid gap-4", children: [
        /* @__PURE__ */ jsxs42("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx54(Label2, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx54(
            Input,
            {
              id: "email",
              name: "email",
              type: "email",
              autoCapitalize: "none",
              autoComplete: "email",
              autoCorrect: "off",
              required: !0
            }
          )
        ] }),
        /* @__PURE__ */ jsxs42("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx54(Label2, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsx54(
            Input,
            {
              id: "password",
              name: "password",
              type: "password",
              autoComplete: "current-password",
              required: !0
            }
          )
        ] }),
        actionData?.error && /* @__PURE__ */ jsx54("div", { className: "text-sm text-red-500", children: actionData.error }),
        /* @__PURE__ */ jsx54(Button, { className: "w-full", disabled: isSubmitting, children: isSubmitting ? "Signing in..." : "Sign in" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs42("div", { className: "text-center text-sm", children: [
      "Don't have an account?",
      " ",
      /* @__PURE__ */ jsx54(
        Link6,
        {
          to: "/auth/register",
          className: "font-medium text-primary hover:underline",
          children: "Sign up"
        }
      )
    ] })
  ] }) });
}

// app/routes/pages.$id.tsx
var pages_id_exports = {};
__export(pages_id_exports, {
  default: () => DocumentPage,
  loader: () => loader10
});
import { json as json13 } from "@remix-run/node";
import { useLoaderData as useLoaderData2 } from "@remix-run/react";
import { jsx as jsx55 } from "react/jsx-runtime";
var loader10 = async ({ request, params }) => {
  let { supabase, response } = await requireAuth(request), { id } = params, { data: document2 } = await supabase.from("documents").select("*").eq("id", id).single();
  if (!document2)
    throw new Response("Not Found", { status: 404 });
  return json13(
    { document: document2 },
    { headers: response.headers }
  );
};
function DocumentPage() {
  let { document: document2 } = useLoaderData2(), { title, setTitle } = usePageTitle(document2.id), { emoji, setEmoji } = usePageEmoji(document2.id);
  return /* @__PURE__ */ jsx55(
    Layout,
    {
      title: title || document2.title,
      emoji: emoji || document2.emoji,
      onTitleChange: setTitle,
      onEmojiChange: setEmoji,
      children: /* @__PURE__ */ jsx55(Editor, { title: title || document2.title, onTitleChange: setTitle })
    }
  );
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  loader: () => loader11
});
import { json as json14 } from "@remix-run/node";
import { useLoaderData as useLoaderData3 } from "@remix-run/react";

// app/components/pages/home.tsx
import {
  ArrowRight,
  Clock as Clock3,
  FileText as FileText6,
  FolderOpen,
  LayoutDashboard,
  Plus as Plus4,
  Star as Star2
} from "lucide-react";
import { Link as Link7 } from "@remix-run/react";
import { jsx as jsx56, jsxs as jsxs43 } from "react/jsx-runtime";
function HomePage({ recentDocuments, starredDocuments }) {
  return /* @__PURE__ */ jsx56(Layout, { minimal: !0, children: /* @__PURE__ */ jsxs43("div", { className: "grid gap-6", children: [
    /* @__PURE__ */ jsxs43("div", { children: [
      /* @__PURE__ */ jsx56("h1", { className: "text-3xl font-bold", children: "Welcome back!" }),
      /* @__PURE__ */ jsx56("p", { className: "mt-2 text-muted-foreground", children: "Here's what's been happening in your workspace." })
    ] }),
    /* @__PURE__ */ jsxs43("div", { children: [
      /* @__PURE__ */ jsx56("h2", { className: "text-lg font-semibold", children: "Quick Actions" }),
      /* @__PURE__ */ jsx56("div", { className: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [
        {
          name: "New Page",
          description: "Create a blank page",
          icon: FileText6,
          href: "#"
        },
        {
          name: "New Folder",
          description: "Create a new folder",
          icon: FolderOpen,
          href: "#"
        },
        {
          name: "New Dashboard",
          description: "Create a dashboard",
          icon: LayoutDashboard,
          href: "#"
        }
      ].map((action12) => /* @__PURE__ */ jsx56(
        Button,
        {
          variant: "outline",
          className: "h-auto flex-col items-start gap-2 p-4 hover:bg-muted",
          asChild: !0,
          children: /* @__PURE__ */ jsxs43(Link7, { to: action12.href, children: [
            /* @__PURE__ */ jsxs43("div", { className: "flex w-full items-center gap-2", children: [
              /* @__PURE__ */ jsx56(action12.icon, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsx56("span", { className: "font-medium", children: action12.name }),
              /* @__PURE__ */ jsx56(ArrowRight, { className: "ml-auto h-4 w-4" })
            ] }),
            /* @__PURE__ */ jsx56("p", { className: "line-clamp-1 text-sm text-muted-foreground", children: action12.description })
          ] })
        },
        action12.name
      )) })
    ] }),
    /* @__PURE__ */ jsxs43("div", { className: "grid gap-6 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs43("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs43("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs43("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx56(Clock3, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx56("h2", { className: "text-lg font-semibold", children: "Recent Pages" })
          ] }),
          /* @__PURE__ */ jsxs43(Button, { variant: "ghost", size: "sm", children: [
            "View All",
            /* @__PURE__ */ jsx56(ArrowRight, { className: "ml-2 h-4 w-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsx56(ScrollArea, { className: "h-[280px] rounded-lg border", children: /* @__PURE__ */ jsxs43("div", { className: "space-y-4 p-4", children: [
          recentDocuments.map((doc) => /* @__PURE__ */ jsxs43(
            Link7,
            {
              to: `/pages/${doc.id}`,
              className: "block space-y-1 rounded-lg p-2 hover:bg-muted",
              children: [
                /* @__PURE__ */ jsxs43("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx56("span", { className: "text-xl", children: doc.emoji }),
                  /* @__PURE__ */ jsx56("span", { className: "font-medium", children: doc.title })
                ] }),
                /* @__PURE__ */ jsxs43("p", { className: "text-sm text-muted-foreground", children: [
                  "Updated ",
                  new Date(doc.updated_at).toLocaleDateString()
                ] })
              ]
            },
            doc.id
          )),
          recentDocuments.length === 0 && /* @__PURE__ */ jsx56("div", { className: "text-center text-sm text-muted-foreground", children: "No recent pages" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs43("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs43("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs43("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx56(Star2, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx56("h2", { className: "text-lg font-semibold", children: "Starred Pages" })
          ] }),
          /* @__PURE__ */ jsxs43(Button, { variant: "ghost", size: "sm", children: [
            "View All",
            /* @__PURE__ */ jsx56(ArrowRight, { className: "ml-2 h-4 w-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsx56(ScrollArea, { className: "h-[280px] rounded-lg border", children: /* @__PURE__ */ jsxs43("div", { className: "space-y-4 p-4", children: [
          (starredDocuments || []).map((doc) => /* @__PURE__ */ jsx56(
            Link7,
            {
              to: `/pages/${doc.id}`,
              className: "block space-y-1 rounded-lg p-2 hover:bg-muted",
              children: /* @__PURE__ */ jsxs43("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx56("span", { className: "text-xl", children: doc.emoji }),
                /* @__PURE__ */ jsx56("span", { className: "font-medium", children: doc.title })
              ] })
            },
            doc.id
          )),
          (starredDocuments || []).length === 0 && /* @__PURE__ */ jsx56("div", { className: "text-center text-sm text-muted-foreground", children: "No starred pages" }),
          /* @__PURE__ */ jsxs43(
            Button,
            {
              variant: "outline",
              className: "w-full justify-start gap-2",
              size: "sm",
              children: [
                /* @__PURE__ */ jsx56(Plus4, { className: "h-4 w-4" }),
                "Add to starred"
              ]
            }
          )
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs43("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs43("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx56("h2", { className: "text-lg font-semibold", children: "Recent Activity" }),
        /* @__PURE__ */ jsxs43(Button, { variant: "ghost", size: "sm", children: [
          "View All",
          /* @__PURE__ */ jsx56(ArrowRight, { className: "ml-2 h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx56("div", { className: "rounded-lg border", children: /* @__PURE__ */ jsx56("div", { className: "p-4", children: /* @__PURE__ */ jsxs43("div", { className: "space-y-4", children: [
        recentDocuments.slice(0, 2).map((doc, i) => /* @__PURE__ */ jsxs43("div", { children: [
          /* @__PURE__ */ jsxs43("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx56("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsx56(FileText6, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxs43("div", { className: "flex-1 space-y-1", children: [
              /* @__PURE__ */ jsxs43("p", { className: "text-sm", children: [
                "You updated",
                " ",
                /* @__PURE__ */ jsx56(
                  Link7,
                  {
                    to: `/pages/${doc.id}`,
                    className: "font-medium underline-offset-4 hover:underline",
                    children: doc.title
                  }
                )
              ] }),
              /* @__PURE__ */ jsx56("p", { className: "text-sm text-muted-foreground", children: new Date(doc.updated_at).toLocaleDateString() })
            ] })
          ] }),
          i < recentDocuments.length - 1 && /* @__PURE__ */ jsx56(Separator2, { className: "my-4" })
        ] }, doc.id)),
        recentDocuments.length === 0 && /* @__PURE__ */ jsx56("div", { className: "text-center text-sm text-muted-foreground", children: "No recent activity" })
      ] }) }) })
    ] })
  ] }) });
}

// app/routes/_index.tsx
import { jsx as jsx57 } from "react/jsx-runtime";
var loader11 = async ({ request }) => {
  let { supabase, response } = await requireAuth(request), { data: recentDocuments } = await supabase.from("documents").select("*").order("updated_at", { ascending: !1 }).limit(5), { data: starredDocuments } = await supabase.from("documents").select("*").eq("is_starred", !0).limit(5);
  return json14(
    { recentDocuments, starredDocuments },
    { headers: response.headers }
  );
};
function Index() {
  let { recentDocuments, starredDocuments } = useLoaderData3();
  return /* @__PURE__ */ jsx57(HomePage, { recentDocuments, starredDocuments });
}

// app/routes/askai.tsx
var askai_exports = {};
__export(askai_exports, {
  default: () => AskAiPage
});

// app/components/ai-chat.tsx
import * as React43 from "react";
import { Bot as Bot3, Send as Send2, Sparkles as Sparkles6, User as User3 } from "lucide-react";
import { motion as motion3, AnimatePresence as AnimatePresence3 } from "framer-motion";
import { jsx as jsx58, jsxs as jsxs44 } from "react/jsx-runtime";
function AiChat() {
  let [messages, setMessages] = React43.useState([]), [input, setInput] = React43.useState(""), [isExpanded, setIsExpanded] = React43.useState(!1), scrollAreaRef = React43.useRef(null), inputRef = React43.useRef(null), formRef = React43.useRef(null), handleSend = () => {
    if (!input.trim())
      return;
    let newMessage = {
      id: String(Date.now()),
      content: input,
      role: "user",
      timestamp: /* @__PURE__ */ new Date()
    };
    setMessages((prev) => [...prev, newMessage]), setInput(""), setIsExpanded(!0), setTimeout(() => {
      let aiResponse = {
        id: String(Date.now() + 1),
        content: "This is a simulated AI response. In a real implementation, this would be connected to an AI service.",
        role: "assistant",
        timestamp: /* @__PURE__ */ new Date()
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1e3);
  };
  return React43.useEffect(() => {
    scrollAreaRef.current && (scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight), !isExpanded && inputRef.current && inputRef.current.focus();
  }, [messages, isExpanded]), /* @__PURE__ */ jsxs44("div", { className: "flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsx58(AnimatePresence3, { mode: "wait", children: isExpanded ? /* @__PURE__ */ jsx58(
      motion3.div,
      {
        className: "flex-1 overflow-hidden",
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3 },
        children: /* @__PURE__ */ jsx58(ScrollArea, { ref: scrollAreaRef, className: "h-full px-4 py-8", children: /* @__PURE__ */ jsx58("div", { className: "mx-auto max-w-2xl space-y-4", children: messages.map((message) => /* @__PURE__ */ jsxs44(
          motion3.div,
          {
            className: `flex gap-3 ${message.role === "assistant" ? "justify-start" : "justify-end"}`,
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.2 },
            children: [
              message.role === "assistant" && /* @__PURE__ */ jsx58("div", { className: "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx58(Bot3, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxs44(
                "div",
                {
                  className: `group relative flex max-w-xl rounded-lg px-3 py-2 text-sm ${message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"}`,
                  children: [
                    /* @__PURE__ */ jsx58("div", { className: "prose prose-sm dark:prose-invert", children: message.content }),
                    /* @__PURE__ */ jsx58(
                      "div",
                      {
                        className: "absolute -top-5 right-0 hidden whitespace-nowrap text-xs text-muted-foreground group-hover:block",
                        children: message.timestamp.toLocaleTimeString()
                      }
                    )
                  ]
                }
              ),
              message.role === "user" && /* @__PURE__ */ jsx58("div", { className: "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx58(User3, { className: "h-4 w-4" }) })
            ]
          },
          message.id
        )) }) })
      },
      "chat"
    ) : /* @__PURE__ */ jsx58(
      motion3.div,
      {
        className: "flex flex-1 items-center justify-center p-4",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: { duration: 0.3 },
        children: /* @__PURE__ */ jsxs44("div", { className: "w-full max-w-2xl px-4", children: [
          /* @__PURE__ */ jsxs44("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsx58("div", { className: "inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4", children: /* @__PURE__ */ jsx58(Sparkles6, { className: "h-6 w-6 text-primary" }) }),
            /* @__PURE__ */ jsx58("h1", { className: "text-3xl font-bold tracking-tight mb-2", children: "How can I help you today?" }),
            /* @__PURE__ */ jsx58("p", { className: "text-lg text-muted-foreground", children: "Ask me anything - I'm here to assist with your questions" })
          ] }),
          /* @__PURE__ */ jsxs44("div", { className: "relative", children: [
            /* @__PURE__ */ jsx58("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 blur-3xl -z-10" }),
            /* @__PURE__ */ jsxs44(
              "form",
              {
                ref: formRef,
                onSubmit: (e) => {
                  e.preventDefault(), handleSend();
                },
                className: "relative flex gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-1 rounded-lg border shadow-lg",
                children: [
                  /* @__PURE__ */ jsx58(
                    Input,
                    {
                      ref: inputRef,
                      placeholder: "Type your message...",
                      value: input,
                      onChange: (e) => setInput(e.target.value),
                      className: "flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    }
                  ),
                  /* @__PURE__ */ jsxs44(Button, { type: "submit", size: "sm", children: [
                    /* @__PURE__ */ jsx58(Send2, { className: "h-4 w-4 mr-2" }),
                    "Send"
                  ] })
                ]
              }
            )
          ] })
        ] })
      },
      "input"
    ) }),
    /* @__PURE__ */ jsx58(AnimatePresence3, { children: isExpanded && /* @__PURE__ */ jsx58(
      motion3.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: { duration: 0.3 },
        className: "border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        children: /* @__PURE__ */ jsx58("div", { className: "mx-auto max-w-2xl p-4", children: /* @__PURE__ */ jsxs44(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault(), handleSend();
            },
            className: "flex gap-2",
            children: [
              /* @__PURE__ */ jsx58(
                Input,
                {
                  ref: inputRef,
                  placeholder: "Type your message...",
                  value: input,
                  onChange: (e) => setInput(e.target.value),
                  className: "flex-1"
                }
              ),
              /* @__PURE__ */ jsxs44(Button, { type: "submit", children: [
                /* @__PURE__ */ jsx58(Send2, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx58("span", { className: "sr-only", children: "Send message" })
              ] })
            ]
          }
        ) })
      }
    ) })
  ] });
}

// app/routes/askai.tsx
import { jsx as jsx59 } from "react/jsx-runtime";
function AskAiPage() {
  return /* @__PURE__ */ jsx59(Layout, { minimal: !0, children: /* @__PURE__ */ jsx59("div", { className: "h-[calc(100vh-3.5rem)] overflow-hidden", children: /* @__PURE__ */ jsx59(AiChat, {}) }) });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-6FLFOKR3.js", imports: ["/build/_shared/chunk-VVVWHFCJ.js", "/build/_shared/chunk-ADMCF34Z.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-7FJLLTHQ.js", imports: ["/build/_shared/chunk-MPAYQPS2.js", "/build/_shared/chunk-VZQVWFLO.js", "/build/_shared/chunk-5KNMRCGT.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-RLB6XEHX.js", imports: ["/build/_shared/chunk-XA5TB5MP.js", "/build/_shared/chunk-CQNWAQVP.js", "/build/_shared/chunk-LJCX3DN2.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.ai.chat": { id: "routes/api.ai.chat", parentId: "root", path: "api/ai/chat", index: void 0, caseSensitive: void 0, module: "/build/routes/api.ai.chat-MDMCJIAM.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.documents.analytics": { id: "routes/api.documents.analytics", parentId: "root", path: "api/documents/analytics", index: void 0, caseSensitive: void 0, module: "/build/routes/api.documents.analytics-AULYKJVM.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.documents.archive": { id: "routes/api.documents.archive", parentId: "root", path: "api/documents/archive", index: void 0, caseSensitive: void 0, module: "/build/routes/api.documents.archive-SFHWZAY7.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.documents.create": { id: "routes/api.documents.create", parentId: "root", path: "api/documents/create", index: void 0, caseSensitive: void 0, module: "/build/routes/api.documents.create-3AKBCRTE.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.documents.share": { id: "routes/api.documents.share", parentId: "root", path: "api/documents/share", index: void 0, caseSensitive: void 0, module: "/build/routes/api.documents.share-GDZ545KH.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.documents.update": { id: "routes/api.documents.update", parentId: "root", path: "api/documents/update", index: void 0, caseSensitive: void 0, module: "/build/routes/api.documents.update-GEUH6PAG.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.documents.versions": { id: "routes/api.documents.versions", parentId: "root", path: "api/documents/versions", index: void 0, caseSensitive: void 0, module: "/build/routes/api.documents.versions-DJOJAU4C.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.workspaces.create": { id: "routes/api.workspaces.create", parentId: "root", path: "api/workspaces/create", index: void 0, caseSensitive: void 0, module: "/build/routes/api.workspaces.create-2QXVU4PY.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/askai": { id: "routes/askai", parentId: "root", path: "askai", index: void 0, caseSensitive: void 0, module: "/build/routes/askai-IBLKIFPX.js", imports: ["/build/_shared/chunk-CQNWAQVP.js", "/build/_shared/chunk-LJCX3DN2.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth.callback": { id: "routes/auth.callback", parentId: "root", path: "auth/callback", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.callback-DVJNLOQV.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth.login": { id: "routes/auth.login", parentId: "root", path: "auth/login", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.login-6L367B7R.js", imports: ["/build/_shared/chunk-PLAJB7ME.js", "/build/_shared/chunk-5EDNXG7T.js", "/build/_shared/chunk-LJCX3DN2.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth.logout": { id: "routes/auth.logout", parentId: "root", path: "auth/logout", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.logout-WEDPT6S2.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth.register": { id: "routes/auth.register", parentId: "root", path: "auth/register", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.register-AU27DQ5G.js", imports: ["/build/_shared/chunk-PLAJB7ME.js", "/build/_shared/chunk-5EDNXG7T.js", "/build/_shared/chunk-LJCX3DN2.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/getting-started": { id: "routes/getting-started", parentId: "root", path: "getting-started", index: void 0, caseSensitive: void 0, module: "/build/routes/getting-started-XZ2SVGBD.js", imports: ["/build/_shared/chunk-7VIHUWIN.js", "/build/_shared/chunk-CQNWAQVP.js", "/build/_shared/chunk-LJCX3DN2.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/library.$id": { id: "routes/library.$id", parentId: "root", path: "library/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/library.$id-OL25Y56E.js", imports: ["/build/_shared/chunk-CQNWAQVP.js", "/build/_shared/chunk-LJCX3DN2.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/pages.$id": { id: "routes/pages.$id", parentId: "root", path: "pages/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/pages.$id-V3OZGGPS.js", imports: ["/build/_shared/chunk-XA5TB5MP.js", "/build/_shared/chunk-7VIHUWIN.js", "/build/_shared/chunk-CQNWAQVP.js", "/build/_shared/chunk-LJCX3DN2.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "3d007498", hmr: void 0, url: "/build/manifest-3D007498.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public\\build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/api.documents.analytics": {
    id: "routes/api.documents.analytics",
    parentId: "root",
    path: "api/documents/analytics",
    index: void 0,
    caseSensitive: void 0,
    module: api_documents_analytics_exports
  },
  "routes/api.documents.versions": {
    id: "routes/api.documents.versions",
    parentId: "root",
    path: "api/documents/versions",
    index: void 0,
    caseSensitive: void 0,
    module: api_documents_versions_exports
  },
  "routes/api.documents.archive": {
    id: "routes/api.documents.archive",
    parentId: "root",
    path: "api/documents/archive",
    index: void 0,
    caseSensitive: void 0,
    module: api_documents_archive_exports
  },
  "routes/api.workspaces.create": {
    id: "routes/api.workspaces.create",
    parentId: "root",
    path: "api/workspaces/create",
    index: void 0,
    caseSensitive: void 0,
    module: api_workspaces_create_exports
  },
  "routes/api.documents.create": {
    id: "routes/api.documents.create",
    parentId: "root",
    path: "api/documents/create",
    index: void 0,
    caseSensitive: void 0,
    module: api_documents_create_exports
  },
  "routes/api.documents.update": {
    id: "routes/api.documents.update",
    parentId: "root",
    path: "api/documents/update",
    index: void 0,
    caseSensitive: void 0,
    module: api_documents_update_exports
  },
  "routes/api.documents.share": {
    id: "routes/api.documents.share",
    parentId: "root",
    path: "api/documents/share",
    index: void 0,
    caseSensitive: void 0,
    module: api_documents_share_exports
  },
  "routes/getting-started": {
    id: "routes/getting-started",
    parentId: "root",
    path: "getting-started",
    index: void 0,
    caseSensitive: void 0,
    module: getting_started_exports
  },
  "routes/auth.callback": {
    id: "routes/auth.callback",
    parentId: "root",
    path: "auth/callback",
    index: void 0,
    caseSensitive: void 0,
    module: auth_callback_exports
  },
  "routes/auth.register": {
    id: "routes/auth.register",
    parentId: "root",
    path: "auth/register",
    index: void 0,
    caseSensitive: void 0,
    module: auth_register_exports
  },
  "routes/api.ai.chat": {
    id: "routes/api.ai.chat",
    parentId: "root",
    path: "api/ai/chat",
    index: void 0,
    caseSensitive: void 0,
    module: api_ai_chat_exports
  },
  "routes/auth.logout": {
    id: "routes/auth.logout",
    parentId: "root",
    path: "auth/logout",
    index: void 0,
    caseSensitive: void 0,
    module: auth_logout_exports
  },
  "routes/library.$id": {
    id: "routes/library.$id",
    parentId: "root",
    path: "library/:id",
    index: void 0,
    caseSensitive: void 0,
    module: library_id_exports
  },
  "routes/auth.login": {
    id: "routes/auth.login",
    parentId: "root",
    path: "auth/login",
    index: void 0,
    caseSensitive: void 0,
    module: auth_login_exports
  },
  "routes/pages.$id": {
    id: "routes/pages.$id",
    parentId: "root",
    path: "pages/:id",
    index: void 0,
    caseSensitive: void 0,
    module: pages_id_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/askai": {
    id: "routes/askai",
    parentId: "root",
    path: "askai",
    index: void 0,
    caseSensitive: void 0,
    module: askai_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
