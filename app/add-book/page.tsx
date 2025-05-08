


export default function AddBook() {

    const handleSubmit = async (event) => {
        
        event.preventDefault()

        try {
            await fetch('/api/tokenhandlers/deleteToken', {
                method: 'POST',
                body: JSON.stringify({
                    ticker: tokens[index].ticker,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Failed to delete token:', error);
            setTokens(tokens); // Rollback to the original state
        }
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <form>
                <input></input>
                <button type="submit"></button>
            </form>

        </div>
    );
}