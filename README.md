# Pomodoro Timer

A simple, stylish Pomodoro timer web app to help you focus and boost productivity using the Pomodoro Technique.

## Features

- 25-minute work sessions and 5-minute breaks
- Animated circular progress indicator
- Session counter
- Start, pause, and reset controls
- Audio notification at the end of each session
- Responsive and modern UI

## Usage

1. **Start**: Click the **Start** button to begin a Pomodoro session.
2. **Pause**: Click **Pause** to pause the timer.
3. **Reset**: Click **Reset** to reset the timer and session count.
4. The timer automatically switches between work and break sessions.

## Installation

No installation required. Just open `index.html` in your browser.

## Project Structure

- [`index.html`](index.html): Main HTML file
- [`styles.css`](styles.css): Styles for the timer UI
- [`script.js`](script.js): Pomodoro timer logic

## Customization

You can adjust the work and break durations in [`script.js`](script.js):

```js
// script.js
this.workTime = 25 * 60; // 25 minutes
this.breakTime = 5 * 60; // 5 minutes
```
