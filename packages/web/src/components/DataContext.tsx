import { useState } from "react";

import { DataContext, type DataContextValue } from "../hooks/useDataContext.ts";

import {
  cardsPreview,
  cardsContents,
  generateRandomId,
  getUserActions,
  user
} from "../assets/data.ts";
import type { DocumentPreview } from "./DocumentCard.tsx";

export type FullDocument = Omit<DocumentPreview, "previewContent"> & { content: string };

export function DataProvider({ children }: { children: React.ReactNode; }) {
  const [previewData, setPreviewData] = useState(cardsPreview);
  const [contentData, setContentData] = useState(cardsContents);

  const parsePreviewContent = (content: string) => content.split(" ").reduce((prev, curr) => {
    if (prev.length < 250) return prev + ` ${curr}`;
    return prev;
  }).trimStart().trimEnd();

  const addDocument: DataContextValue["addDocument"] = item => {
    const newId = generateRandomId();

    const newPreviewData: DocumentPreview = {
      ...getUserActions(user.id, user),
      docid: newId,
      title: item.title.trim(),
      authorId: item.authorId,
      authorName: item.authorName,
      previewContent: parsePreviewContent(item.content),
    };

    setPreviewData(prev => [newPreviewData, ...prev]);
    setContentData(prev => {
      const newMap = new Map(prev);
      newMap.set(newPreviewData.docid, item.content)
      return newMap;
    });

    return newPreviewData;
  };

  const editDocument: DataContextValue["editDocument"] = (docid, changes) => {
    const targetDocId = previewData.findIndex(d => d.docid === docid);
    if (targetDocId === -1) return null;
    const targetDocCp: DocumentPreview = { ...previewData[targetDocId] };

    if (changes.title) targetDocCp.title = changes.title?.trim();
    if (changes.content) {
      targetDocCp.previewContent = parsePreviewContent(changes.content);
      setContentData(prev => {
        const newMap = new Map(prev);
        newMap.set(targetDocCp.docid, changes.content!.trimStart().trimEnd());
        return newMap;
      });
    }

    setPreviewData(prev => {
      prev[targetDocId] = targetDocCp;
      return [...prev];
    });

    return targetDocCp;
  };

  const deleteDocument: DataContextValue["deleteDocument"] = docid => {
    let deleted = false;

    setPreviewData(prev => prev.filter(i => i.docid !== docid));
    setContentData(prev => {
      const newMap = new Map(prev);
      newMap.delete(docid);
      return newMap;
    });

    deleted = true;

    return deleted;
  };

  return (
    <DataContext.Provider
      value={{
        docsPreview: previewData,
        docsContents: contentData,
        addDocument,
        editDocument,
        deleteDocument
      }}
    >
      {children}
    </DataContext.Provider>
  );
}