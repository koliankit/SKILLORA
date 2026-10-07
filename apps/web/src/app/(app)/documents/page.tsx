"use client";

import React, { useState } from "react";
import { useBusinessStore } from "@/store/businessStore";
import {
  FileText,
  UploadCloud,
  FileCheck,
  Search,
  Plus,
  Eye,
  Lock,
  Download,
  CheckCircle2
} from "lucide-react";

export default function DocumentsPage() {
  const { documents, addDocument } = useBusinessStore();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Invoices" | "Contracts" | "Compliance Evidence" | "Board Resolutions">("Contracts");
  const [fileName, setFileName] = useState("");

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !fileName) return;

    addDocument({
      title,
      category,
      file_name: fileName,
      size: "1.2 MB",
      status: "Pending Sign-off",
      ocr_extracted_data: { status: "Verified", parsed_timestamp: new Date().toISOString() }
    });

    setTitle("");
    setFileName("");
    setModalOpen(false);
  };

  const filteredDocs = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.category.toLowerCase().includes(search.toLowerCase()) ||
      doc.file_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs uppercase tracking-wider text-skillora-primary">
                Document & Invoice Intelligence
              </span>
              <span className="rounded bg-skillora-primary/10 px-2 py-0.5 text-[10px] font-mono text-skillora-primary">
                Layer 36-37
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Enterprise Document Vault & OCR Parser
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Contract agreements, vendor invoices, board resolutions, and automated OCR structured field extraction.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setModalOpen(true)} className="btn-primary text-xs">
              <UploadCloud className="h-3.5 w-3.5" />
              <span>Upload Document</span>
            </button>
          </div>
        </div>

        {/* Top Metric Tiles */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">Total Stored Files</span>
            <p className="font-heading text-3xl font-extrabold text-white mt-1">{documents.length} Records</p>
            <span className="text-[11px] text-emerald-400 font-mono mt-1">Encrypted at rest (AES-256)</span>
          </div>

          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">OCR Parsed Fields</span>
            <p className="font-heading text-3xl font-extrabold text-skillora-primary mt-1">100%</p>
            <span className="text-[11px] text-slate-400 font-mono mt-1">Zero manual data entry</span>
          </div>

          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">Pending Signatures</span>
            <p className="font-heading text-3xl font-extrabold text-amber-400 mt-1">1 Document</p>
            <span className="text-[11px] text-slate-400 font-mono mt-1">Tata Advanced Systems MSA</span>
          </div>

          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">Audit Verified</span>
            <p className="font-heading text-3xl font-extrabold text-emerald-400 mt-1">3 Files</p>
            <span className="text-[11px] text-slate-400 font-mono mt-1">SOC2 & ISO 27001 Linked</span>
          </div>
        </div>

        {/* Document List */}
        <div className="skillora-card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="font-heading text-base font-semibold text-white">
              Document Vault ({filteredDocs.length})
            </h2>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search file or contract..."
                className="input-field pl-9 py-1.5 text-xs"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="rounded-lg border border-skillora-border bg-skillora-ink-card p-4 hover:border-skillora-primary/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-skillora-primary/10 border border-skillora-primary/30 text-skillora-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-white text-sm">{doc.title}</h3>
                      <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-1">
                        <span>{doc.file_name}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                        <span className="rounded bg-skillora-ink-light px-1.5 py-0.2 text-[10px] text-slate-300">
                          {doc.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                      doc.status === "Audited"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                </div>

                {/* Extracted OCR Telemetry / Key Metadata */}
                {doc.ocr_extracted_data && (
                  <div className="mt-3 pt-3 border-t border-skillora-border/50 grid gap-2 sm:grid-cols-3 text-xs bg-skillora-ink-light/40 p-2.5 rounded">
                    {Object.entries(doc.ocr_extracted_data).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-[10px] font-mono uppercase text-slate-500 block">
                          {k.replace("_", " ")}
                        </span>
                        <span className="font-mono text-skillora-primary text-[11px]">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md skillora-card p-6 shadow-2xl border-skillora-primary/40">
            <h3 className="font-heading text-lg font-bold text-white mb-2">
              Upload Business Document
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Add agreements, invoices, or compliance certificates for automated OCR parsing.
            </p>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Document Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Master Services Agreement 2026"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="input-field"
                >
                  <option value="Contracts">Contracts</option>
                  <option value="Invoices">Invoices</option>
                  <option value="Compliance Evidence">Compliance Evidence</option>
                  <option value="Board Resolutions">Board Resolutions</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">File Name</label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. Enterprise_MSA_AeroSync.pdf"
                  className="input-field"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-skillora-border">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-ghost text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Upload & Parse OCR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
