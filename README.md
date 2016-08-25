# Bingo!: An automatic bingo player

[Click here to watch the demo!](https://www.youtube.com/watch?v=xAVjrJYamLQ)

To run the app, first clone the repository and run ``npm install``. Then start the server with the command ``npm run start`` and navigate to ``localhost:3000`` in Google Chrome (other browsers will not work, as the site depends on Chrome's speech recognition API). Play Bingo!

Made at CarlHacks 2016. The Devpost submission page is reproduced below.

---

## Inspiration
Bingo is hard. B9... O66... G54... B3 G50 O70 N40 I28-B3-B6-B9-I20, oh man! You get distracted for the blink of an eye and you're stuck stressfully playing catch-up! What if a computer could keep track of our Bingo board for us? Could such a world really exist?

## What it does
Bingo! works like this:

1. Upload an image of your bingo board
2. Crop it to show just those 25 beautiful squares of numbers
3. Bingo! uses OCR to translate your image into a digital representation of the board
4. Click "Start Listening", and Bingo! uses your microphone to listen for Letter-Number combinations, filling in your board accordingly and showing you the status of your board on the screen.
5. When Lady Luck shines upon you and you reach a glorious BINGO!, Bingo!'s speech-synthesis will even announce "Bingo!"--no more getting sniped at the last minute by someone with the vocal reflexes of a Chickadee. 
6. You can also receive a text message notifying you that you've BINGO'ed, so you can play from afar and, at the last minute, dramatically dash back into the bingo parlor to declare your victory.

## How I built it
OCRADjs for OCR, annyangjs for voice recognition, Javascript with jQuery to manipulate the DOM. Served up with the most basic of Express servers to avoid those weird cross-site security errors.

## Challenges I ran into
I've never been too great at laying out a webpage so that it's visually interesting, so that was difficult here. I think I struck an O(67!)kay balance between aesthetics and functionality.

## What I learned
I(29!) increased my knowledge of using jQuery and manipulating the DOM, as well as using CSS to lay things out prettily.

## What's next for Bingo!
* Manipulation of image contrast / brightness for improved OCR accuracy
* Play multiple boards at once, to maximize your bingo triumph
