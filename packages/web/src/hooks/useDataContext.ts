import { createContext, useContext } from "react";
import type { DocumentPreview } from "../components/DocumentCard";
import type { FullDocument } from "../components/DataContext";

export interface DataContextValue {
  docsPreview: DocumentPreview[];
  docsContents: Map<string, string>;
  addDocument: (item: FullDocument) => DocumentPreview;
  editDocument: (
    docid: string,
    changes: { title?: string; content?: string },
  ) => DocumentPreview | null;
  deleteDocument: (docid: string) => boolean;
}

export const DataContext = createContext<DataContextValue | null>(null);

export const useData = () => useContext(DataContext);
