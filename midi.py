from pygame import midi
from time import sleep
import random
import logging
import PyATEMMax as atem

LABELS_MIDINOTES = {0: "preacher", 1: "band", 2: "next slide", 3: "service start", 4: "service end", 5: "enable lower third", 6: "hide lower third", 7: "reading"}
BUFFER = True
CURRENT_SLIDE = 3
# USE_ATEM = False

# if USE_ATEM:
#     switcher = atem.ATEMMax()
#     switcher.connect("192.168.0.68")
#     sleep(1)

switcher = atem.ATEMMax()
switcher.connect("192.168.2.208")
switcher.waitForConnection(infinite=False, timeout=5)

# switcher.setLogLevel(logging.DEBUG)
# switcher.setSocketLogLevel(logging.DEBUG)

midi.init()
default_id = 1
midi_input = midi.Input(device_id=default_id)

try:
    print("hello")
    while True:
        if midi_input.poll():
            note = midi_input.read(1)[0][0][1]
            print(LABELS_MIDINOTES[note])

            # Next slide trigger. If buffer is false wait until the next slide to switch.
            # Will attempt to switch to the not active camera.
            if LABELS_MIDINOTES[note] == "next slide":
                switcher.setKeyerOnAirEnabled(0, 0, True)
                if BUFFER:
                    CURRENT_SLIDE = 3 if CURRENT_SLIDE == 4 else 4
                    switcher.setPreviewInputVideoSource(0, CURRENT_SLIDE)
                    switcher.execAutoME(0)
                BUFFER = not BUFFER

            # Changes switcher to the preacher.
            elif LABELS_MIDINOTES[note] == "preacher":
                switcher.setPreviewInputVideoSource(0, 2)
                switcher.execAutoME(0)

            # Changes switcher to band.
            elif LABELS_MIDINOTES[note] == "band":
                switcher.setPreviewInputVideoSource(0, CURRENT_SLIDE)
                switcher.execAutoME(0)

            # Switches to preacher and disables lower third
            elif LABELS_MIDINOTES[note] == "service start":
                switcher.setProgramInputVideoSource(0, 2)
                switcher.setKeyerOnAirEnabled(0, 0, False)

                # switcher.setAudioLevelsEnable(True)
                # switcher.setAudioMixerInputMixOption(switcher.atem.audioSources.mic1, switcher.atem.audioMixerInputMixOptions.on)
                # switcher.setAudioLevelsEnable(False)
            
            # Turns on keyer (shows lower third)
            elif LABELS_MIDINOTES[note] == "enable lower third":
                switcher.setKeyerOnAirEnabled(0, 0, True)
            
            # Turns off keyer (hides lower third)
            elif LABELS_MIDINOTES[note] == "hide lower third":
                switcher.setKeyerOnAirEnabled(0, 0, False)
            
            # Turns off keyer. The user will manually turn it on when they start talking.
            elif LABELS_MIDINOTES[note] == "reading":
                switcher.setKeyerOnAirEnabled(0, 0, False)

        sleep(0.1)

except KeyboardInterrupt as err:
    print("Stopping...")
    switcher.disconnect()
