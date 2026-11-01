# Proven local video workflow

Use this reference for setup, capture planning, media organization, captions,
audio, and handoff. It records the lessons from the first ScrumPulse promo.

## Proven Windows stack

- **Codex Desktop:** orchestration, scripts, manifests, previews, and static QA.
- **Windows Snipping Tool:** simplest screen recorder for short takes. Select
  screen recording, capture only the app/browser region, and turn the
  microphone off. OBS Studio or Xbox Game Bar are acceptable alternatives.
- **Kdenlive 26.08.2:** source-of-truth nonlinear editor. Installed through
  `KDE.Kdenlive`. The user must be able to inspect and change cuts, audio,
  captions, titles, transitions, and keyframes.
- **FFmpeg and FFprobe 9.0.2:** installed through `Gyan.FFmpeg`; use for media
  inspection, normalization, contact sheets, preview renders, final metadata
  checks, and alternate encodes—not as a replacement for the editable project.
- **Python + Kokoro ONNX:** local synthetic voice-over. The proven voice is
  English `af_heart`, 24 kHz, approximately `speed=1.03`, with about 0.22 s
  between narration sections. Preserve the normalized narration master.
- **Chrome:** factual research and B-roll discovery only. A search result is
  not license evidence.
- **HyperFrames/Parakeet:** optional. Add motion tooling only when Kdenlive
  cannot express the desired animation cleanly; add transcription only for
  source footage containing speech.
- CapCut and Filmora can be references, but are not project dependencies.

## Brief the recordings before the user captures them

Write a `Required recordings` section. Each take must look like this:

```text
### `03-feature-name.mp4` — 8 to 10 seconds
1. Open the feature with believable demo data already prepared.
2. Hold still for one second.
3. Perform one or two deliberate interactions that demonstrate the value.
4. Keep the important result visible.
5. Hold the final state for one second.
```

Capture rules:

- Prefer 1920×1080 at 30 fps and keep browser size and zoom identical.
- Hide tabs, bookmarks, notifications, passwords, and personal information.
- Disable microphone and system audio unless speech is intentionally required.
- Keep the pointer visible and move slowly; avoid rapid scrolling and accidental
  hover states.
- Prepare data and text before recording; avoid long typing sequences.
- Record each feature independently and keep raw files untouched.
- It is fine to record more useful features than the initial storyboard; label
  each take clearly so the editor can choose rather than guess.

The user performs the visual capture check. Codex can inspect metadata and
extract frames/contact sheets, but should not attempt to judge playback through
the unreliable native-app automation path.

## Local file organization

```text
assets/
  footages/                 # untouched recordings, one feature per file
  promo-*.png               # approved stills and product imagery
  video/
    work/
      captions/             # editable ASS/SRT and caption generator
      caption-review/       # temporary A/B and karaoke review renders
      contact-sheets/       # editorial inspection only
      editor/               # manifests and deterministic timeline helpers
      music/                # original track, derivative bed, license evidence
      tts/                  # voice scripts, models/samples, manifests
      *.kdenlive            # editable source and named safety copies
    final/                   # approved masters, poster, web/social variants
```

Review raw and intermediate video sizes before committing them. Commit only the
final web assets when their loading cost is acceptable.

## Ingest and timeline

1. FFprobe every take and create a source inventory.
2. Create a 1920×1080, 30 fps Kdenlive project.
3. Import all sources into the Project Bin before assembling the timeline.
4. Select stable action windows and remove idle padding.
5. Fit/crop varying source sizes without changing aspect ratio.
6. Use still images with subtle motion when they communicate more clearly than
   a rushed screen interaction.
7. Keep video, voice, music, titles, and subtitles on separate tracks.
8. Preserve the user's corrected project. Before a generated revision, create
   a dated backup and write to a new `*-generated` or `*-work` basename.

Generated Kdenlive resources must be relative or use `C:/...`. The leading
slash form `/C:/...` caused every clip to appear missing on Windows and forced
manual relinking.

## Voice-over and music

Start with a short English narration script mapped to scenes. Generate separate
segments plus a combined master and retain a JSON timing manifest. Use the
Kokoro `af_heart` result as the baseline; offer voice samples before replacing
an already approved performance.

The first proven music treatment used **Close Up** by Michael Ramir C. from
Mixkit under the Mixkit Stock Music Free License. Keep the original audio and
saved catalog/license pages beside the normalized `music-bed.wav` derivative.
Pixabay Music and YouTube Audio Library are acceptable alternatives when their
current terms are checked and recorded.

For every external track or B-roll asset preserve:

- exact filename, title, creator, and source URL;
- download date and applicable license/certificate;
- saved license page or screenshot;
- required attribution and Content ID status when relevant.

## Karaoke captions

The successful 1080p treatment used:

- ASS `PlayResX=1920`, `PlayResY=1080`;
- Segoe UI Semibold, 30 px;
- bottom-center alignment with about 32 px bottom margin;
- compact sentence-width background `#0B1115` at roughly 84% opacity;
- base text `#FFF4DA` and spoken highlight `#FFD86B`;
- at most two balanced lines;
- ASS `\kf` timings so letters progressively fill with gold.

Keep the ASS editable. Import it manually in Kdenlive through
**Sequence > Subtitles > Import Subtitle File**, then confirm it appears in the
Project Monitor and in a real render. Keep the subtitle track easy to disable,
and retain a clean no-caption export. If automatic word alignment is not
available, proportional timing inside already approved narration cues is an
acceptable first review; refine individual durations only when the user notices
drift.

Do not rely on burned SRT previews as proof that captions exist in the project:
the first rough cut rendered captions correctly with FFmpeg while Kdenlive had
no subtitle track at all.

## Approval and QA

The user is the visual reviewer and may render from Kdenlive. Codex should:

- produce small, named A/B reviews rather than altering the whole edit blindly;
- inspect representative frames and verify files with FFprobe;
- provide exact manual Kdenlive steps when GUI automation cannot target Qt;
- record approved elements and avoid changing them in later iterations;
- verify duration, 1920×1080, 30 fps, H.264 video, audio presence, clean fades,
  readable captions, CTA visibility, and licensing evidence.

Deliver both captioned and clean masters, the editable project, ASS/SRT files,
and a poster frame. Create a 4:5 social version only after the 16:9 master is
approved.

## YouTube publishing and engagement

Prepare the publication package only after the master is approved. Verify the
current limits in official YouTube Help because platform constraints can
change. For the ScrumPulse release, the relevant limits were 100 characters
for the title, 5,000 for the description, 500 for the internal tag field, and
fewer than 60 hashtags.

### Thumbnail

- Use 16:9 and the largest practical source; the proven deliverable was
  3840×2160 JPG under 2 MB so it could also be uploaded from mobile.
- Base the design on a real product screenshot and recognizable branding.
- Lead with one short, high-contrast pain statement that creates curiosity
  without making a false claim.
- Let the title explain the solution instead of repeating the thumbnail.
- Keep exact text, strong crop-safe margins, and only one supporting badge.
- Preserve both the generated source PNG and the compressed upload-ready JPG.

The proven ScrumPulse pattern was a dark pain-led left side and recognizable
product UI on the right. The thumbnail asked what was wrong; the title promised
the practical resolution.

### Titles

- Propose about five options before upload.
- Put the viewer's problem or desired outcome before the product name when that
  creates a stronger reason to click.
- Include important search language naturally, such as the workflow, audience,
  or solution type. Do not fill the title with disconnected keywords.
- Make title and thumbnail complementary. One creates the curiosity gap; the
  other explains why the video is relevant.
- Count characters and remain within the current platform limit.

### Description and hashtags

Use nearly the available description space only when every section remains
useful. Structure it for both humans and search:

1. Open with a unique two-line value proposition containing the main search
   phrase and the primary product URL.
2. Add the source/repository URL near the top when relevant.
3. Explain the real pain, the solution, principal features, intended audience,
   differentiators, technical details, licensing/attribution, and a clear CTA.
4. Include a natural localized paragraph when another supported language is a
   meaningful discovery path; do not duplicate the whole description.
5. End with a question that invites viewers to describe their own problem.
6. Put the most important three hashtags first, followed by a restrained set of
   directly relevant hashtags. Do not maximize hashtag count: over-tagging
   weakens relevance and exceeding YouTube's limit can cause all to be ignored.

### Internal search tags

Do not fill the 500-character tag field with isolated category words such as
`scrum`, `offline scrum board`, or `sprint planning`. Model how a person
actually searches when trying to learn, compare, or solve a problem.

Prefer natural English long-tail queries such as:

- `why do scrum teams fail`
- `how does scrum work in practice`
- `when should I use scrum or kanban`
- `how to plan sprint capacity`
- `how to run effective sprint planning`
- `how to keep daily scrum under 15 minutes`
- `best free scrum tool for teams`

Use commas between queries, remove near-duplicates, and count the complete
field before handoff. Product and feature words can appear inside these queries
without becoming a list of disconnected tags.

### Category and engagement

- Use **Science & Technology** for a software product demonstration.
- Use **Education** for a Scrum explainer or tutorial; use **Howto & Style**
  only when the video is genuinely a step-by-step practical lesson.
- Add a poll when asking for experience or opinion; reserve a quiz for a
  question with a correct answer.
- A useful poll asks one concrete pain question and offers three concise,
  non-overlapping answers. End with a request to explain the vote in comments.

Example pattern:

```text
What do you see going wrong most often in Scrum?
- Sprint Planning is chaotic and takes too long
- Roles and processes are unclear
- Backlog items lack context and acceptance criteria
```

After publication, save the public/watch URL and the embed URL in the project
handoff. Use them only after confirming the video's visibility and playback.
