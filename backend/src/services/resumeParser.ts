/**
 * Simple resume text parser.
 * - We only accept text resumes for now (resumeText).
 * - Extracts name, email, phone when possible.
 * - Returns { parsed: {name?, email?, phone?}, missing: string[] }
 */

export function parseResumeText(text?: string) {
    const ret: { name?: string; email?: string; phone?: string } = {};
    const missing: string[] = [];
  
    if (!text || text.trim().length === 0) {
      return { parsed: ret, missing: ["name", "email"] };
    }
  
    // simplistic extraction using regex
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/i);
    if (emailMatch) ret.email = emailMatch[0];
  
    const phoneMatch = text.match(/(\+?\d[\d\-\s]{6,}\d)/);
    if (phoneMatch) ret.phone = phoneMatch[0].replace(/\s+/g, " ").trim();
  
    // naive name guess: first line up to newline if it contains letters but not 'email' or 'phone'
    const firstLine = text.split("\n").map(s => s.trim()).find(s => s.length > 1 && !/email|phone|@/i.test(s));
    if (firstLine && firstLine.split(" ").length <= 4) {
      ret.name = firstLine;
    }
  
    if (!ret.name) missing.push("name");
    if (!ret.email) missing.push("email");
    if (!ret.phone) missing.push("phone");
    return { parsed: ret, missing };
  }
  