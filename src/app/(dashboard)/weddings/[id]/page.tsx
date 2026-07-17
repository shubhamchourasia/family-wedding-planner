import { notFound } from "next/navigation";

import { WeddingWorkspace } from "@/features/wedding/components/workspace/wedding-workspace";

import {
  getWeddingById,
} from "@/features/wedding/services/wedding.service";

interface WeddingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WeddingPage({
  params,
}: WeddingPageProps) {

  const { id } = await params;

  const wedding =
    await getWeddingById(id);

  if (!wedding) {
    notFound();
  }

  return (
    <WeddingWorkspace
      wedding={wedding}
    />
  );
}