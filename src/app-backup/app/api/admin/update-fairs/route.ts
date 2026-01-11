import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    // Auth check
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Email check
    const user = await currentUser();
    if (user?.primaryEmailAddress?.emailAddress !== "agnathe@gmail.com") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get the generated code from request
    const { code } = await request.json();
    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    // Build the complete file content
    const fileContent = `// Fuarlar - Static Data
// Fuar eklemek/güncellemek için bu listeyi düzenleyin

export interface Fair {
  id: number;
  name: { tr: string; en: string };
  slug: string;
  sector: { tr: string; en: string };
  startDate: string; // YYYY-MM-DD format
  endDate: string; // YYYY-MM-DD format
  location: {
    venue: string;
    city: string;
    country: string;
  };
  website?: string;
  description: { tr: string; en: string };
  image?: string;
  featured: boolean;
}

${code}
`;

    // Write to file
    const filePath = path.join(process.cwd(), "src", "data", "fairs.ts");
    await writeFile(filePath, fileContent, "utf-8");

    return NextResponse.json({
      success: true,
      message: "Fairs file updated successfully"
    });
  } catch (error) {
    console.error("Error updating fairs file:", error);
    return NextResponse.json(
      { error: "Failed to update file" },
      { status: 500 }
    );
  }
}
