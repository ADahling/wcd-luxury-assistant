
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DocumentCreatePage } from "@/components/document-create-page";

export default async function CreateDocument() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  return <DocumentCreatePage />;
}
