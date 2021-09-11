# Autostream

Basically a program to automatically control a Blackmagic ATEM Mini Pro from midi inputs coming from faithlife proclaim.

## Requirements

- [LoopMIDI](https://www.tobias-erichsen.de/software/loopmidi.html)
- Faithlife Proclaim (or any other midi controller)
- Blackmagic Design ATEM device (any device will work but only tested with ATEM Mini Pro)

## How to configure environment

LoopMIDI must be configured as the first MIDI device (has device ID 1 on windows). I'll fix this eventually, and also remove LoopMIDI as a dependancy because I just found out that the midi library can make its own inputs like whaaaaaaat. I'll get round to it eventually.

## Midi inputs

When note "note" is played (), execute this action.\
You'll be able to configure this eventually but its hardcoded as this for now

| Note | Action             | Description                                  |
| ---- | ------------------ | -------------------------------------------- |
| 0    | Preacher           | Fades to Camera 2                            |
| 1    | Band               | Fades to Camera 3                            |
| 2    | Next Slide         | Every other slide, fade to non-active camera |
| 3    | Service Start      | Hide lower third, cut to Camera 2            |
| 4    | Service End        | Show lower third, cut to Camera 1            |
| 5    | Enable Lower Third | Show lower third (activate keyer)            |
| 6    | Hide Lower Third   | Hide lower third (deactivate keyer)          |
| 7    | Reading            | Cuts to Camera 2 and hide lower third        |
