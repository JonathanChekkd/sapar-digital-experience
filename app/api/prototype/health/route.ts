import { NextResponse } from "next/server";

import {
  buildPrototypeApiErrorResponse,
  buildPrototypeHealthResponse,
  PROTOTYPE_NO_STORE_HEADERS,
  type PrototypeApiErrorResponse,
  type PrototypeHealthResponse,
} from "@/lib/sapar-prototype-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PrototypeMethodNotAllowedResponse {
  readonly status: "error";
  readonly mode: "local-prototype";
  readonly error: Readonly<{
    code: "METHOD_NOT_ALLOWED";
    message: "Only GET is supported for this prototype endpoint.";
  }>;
}

function methodNotAllowed(): NextResponse<PrototypeMethodNotAllowedResponse> {
  return NextResponse.json(
    {
      status: "error",
      mode: "local-prototype",
      error: {
        code: "METHOD_NOT_ALLOWED",
        message: "Only GET is supported for this prototype endpoint.",
      },
    },
    {
      status: 405,
      headers: { ...PROTOTYPE_NO_STORE_HEADERS, Allow: "GET" },
    },
  );
}

export const POST = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;

export function GET(): NextResponse<
  PrototypeHealthResponse | PrototypeApiErrorResponse
> {
  try {
    return NextResponse.json(buildPrototypeHealthResponse(new Date()), {
      status: 200,
      headers: PROTOTYPE_NO_STORE_HEADERS,
    });
  } catch {
    return NextResponse.json(buildPrototypeApiErrorResponse(), {
      status: 500,
      headers: PROTOTYPE_NO_STORE_HEADERS,
    });
  }
}
