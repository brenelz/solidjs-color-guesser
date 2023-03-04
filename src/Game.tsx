import { createSignal, For, Show } from "solid-js";
import { generateColors, getCorrectColor } from "./colors";

const NUM_COLORS = 3;

function Game() {
    const [colors, setColors] = createSignal(generateColors(NUM_COLORS));
    const [correctColor, setCorrectColor] = createSignal(getCorrectColor(colors()));
    const [guess, setGuess] = createSignal<string | undefined>(undefined);

    const nextGame = () => {
        setColors(generateColors(NUM_COLORS));
        setCorrectColor(getCorrectColor(colors()));
        setGuess('');
    }

    const wonGame = () => guess() === correctColor();

    return (
        <div
            style={{
                display: "flex",
                'flex-direction': "column",
                'align-items': "center",
                margin: 'auto',
            }}
        >
            <h1>Color Codes</h1>
            <h2>{correctColor}</h2>
            <h2>What color is this?</h2>

            <div data-testid="color-container" style={{ display: 'flex', gap: "10px" }}>
                <For each={colors()}>{color =>
                    <button
                        onClick={() => {
                            setGuess(color);
                        }}
                        style={{
                            height: "100px",
                            width: "100px",
                            cursor: 'pointer',
                            background: color
                        }}
                        data-testid={color === correctColor() ? "correct-color" : "incorrect-color"}>
                    </button>
                }</For>
            </div>

            <Show when={guess()}>
                <Show when={wonGame()} fallback={<p>Incorrect!</p>}>
                    <div style={{ 'text-align': 'center' }}>
                        <p>Correct!</p>
                        <p><button onClick={nextGame}>Play Again</button></p>
                    </div>
                </Show>
            </Show>
        </div >
    )
}

export default Game;
