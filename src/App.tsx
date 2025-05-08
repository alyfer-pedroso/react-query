import { FileDown, Loader, MoreHorizontal, Plus } from "lucide-react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";

import "./App.css";
import { Pagination } from "./components/pagination";
import { Link, useSearchParams } from "react-router-dom";

export interface TagResponse {
  first: number;
  prev: number | null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Tag[];
}

export interface Tag {
  title: string;
  amountOfVideos: number;
  id: string;
}

function App() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) || 1 : 1;

  const { data: tagsResponse, isLoading } = useQuery<TagResponse>({
    queryKey: ["get-tags", page],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3333/tags?_page=${page}&_per_page=10`);
      const data = await res.json();

      await new Promise((res) => setTimeout(res, 2000));

      return data;
    },
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader className="size-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-10 space-y-8">
      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">
            <Link to="/?page=1">Tags</Link>
          </h1>
          <Button variant="default">
            <Plus className="size-3" />
            Create new
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Input placeholder="Search tags..." className="w-52" />

          <Button>
            <FileDown className="size-3" />
            Export
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Amount of videos</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tagsResponse?.data.map((value) => (
              <TableRow key={value.id}>
                <TableCell></TableCell>
                <TableCell>
                  <div className="flex flex-col gap-05">
                    <span className="font-medium">{value.title}</span>
                    <span className="text-xs text-zinc-600">{value.id}</span>
                  </div>
                </TableCell>
                <TableCell className="text-zinc-400">{value.amountOfVideos} video(s)</TableCell>
                <TableCell className="text-right">
                  <Button size="icon">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {tagsResponse && <Pagination page={page} items={tagsResponse.items} pages={tagsResponse.pages} />}
      </main>
    </div>
  );
}

export default App;
