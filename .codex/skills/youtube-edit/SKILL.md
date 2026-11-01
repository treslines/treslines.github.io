---
name: youtube-edit
description: Plan, assemble, revise, and deliver short product promos or YouTube-style videos with an editable Kdenlive project, local voice-over, licensed music, and accessible captions. Use when recorded takes must become a repeatable, user-reviewable video rather than an FFmpeg-only render.
---

# YouTube Edit

Create concise product videos while keeping every editorial decision inspectable
and editable by the user.

Read [references/workflow.md](references/workflow.md) before starting a new
production or changing the toolchain. It contains the proven Windows stack,
recording brief, file layout, caption style, and licensing rules.

## Non-negotiable workflow

1. Lock the audience, message, language, CTA, target duration, aspect ratio, and
   distribution channel before requesting footage.
2. Turn the approved story into a recording brief. For every take specify the
   filename, duration, prepared starting state, exact actions, and one-second
   holds before and after the interaction.
3. Let the user record clean takes. Do not add music, captions, transitions, or
   compression to raw footage.
4. Inspect every source with FFprobe before editing. Record duration,
   dimensions, frame rate, codecs, and audio presence. Never stretch footage;
   fit or crop it consistently to the master canvas.
5. Build the picture, voice-over, music, captions, transitions, and titles as
   separate editable elements in Kdenlive. The `.kdenlive` project is the
   source of truth; FFmpeg is for deterministic preparation, previews, and QA.
6. Preserve raw media and approved edits. Back up a user-corrected Kdenlive
   project before regeneration, and generate new revisions under new names.
7. Ask the user to perform visual playback and rendering checks in Kdenlive.
   Do not spend time attempting native Kdenlive UI automation: it proved
   unreliable. Codex should perform static checks, contact-sheet/frame review,
   FFprobe validation, and prepare exact manual import steps.
8. Change only the elements named in review feedback. Treat already approved
   footage, cuts, timing, music, voice, or copy as locked.

## Editorial defaults

- Prefer a 55–70 second product promo; avoid exceeding 90 seconds unless the
  video is intentionally a tutorial.
- Use deliberate cursor movement, restrained 200–400 ms transitions, and
  scenes only as long as needed to communicate their value.
- Prefer original product footage and promotional images. Use external B-roll
  only when it explains a specific claim and its license is documented.
- Use English Kokoro `af_heart` as the proven local voice-over starting point.
  Keep narration concise and leave enough space for the interface to breathe.
- Prefer instrumental, lightly technological music without vocals. Preserve
  the source, license page, creator, download date, and attribution details.
- Use editable ASS karaoke captions when narration is present: warm off-white
  text on a compact translucent near-black box, progressively highlighted in
  product gold. Keep captions low and to at most two lines.

## Windows media-path invariant

Use relative paths inside a self-contained editing workspace when possible.
Otherwise use `C:/Users/...` in Kdenlive XML—never `/C:/Users/...`. Validate
that every referenced source exists before handing the project to the user.

## Review deliverables

For each approval round provide:

- the editable Kdenlive working copy;
- a review MP4 with the current treatment;
- a clean caption-free review when captions are being evaluated;
- editable ASS/SRT captions;
- a short statement of what changed and what stayed locked.

After approval, render the 1920×1080, 30 fps H.264 master, verify it with
FFprobe, export the accessibility subtitle artifact and a poster frame, then
create alternate aspect ratios as separate projects or sequences. Before
publication, prepare a complete upload package: pain-led thumbnail and titles,
search-oriented description, hashtags, natural-language search tags, category,
and an engagement poll. Record the published URL for later website embedding.
