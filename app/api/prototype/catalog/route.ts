import { NextResponse } from "next/server";

import {
  buildPrototypeApiErrorResponse,
  buildPrototypeCatalogResponse,
  PROTOTYPE_NO_STORE_HEADERS,
  type PrototypeApiErrorResponse,
  type PrototypeCatalogResponse,
} from "@/lib/sapar-prototype-api";
import { saparPrototype } from "@/lib/sapar-prototype";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET(): NextResponse<
  PrototypeCatalogResponse | PrototypeApiErrorResponse
> {
  try {
    return NextResponse.json(buildPrototypeCatalogResponse(saparPrototype), {
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
