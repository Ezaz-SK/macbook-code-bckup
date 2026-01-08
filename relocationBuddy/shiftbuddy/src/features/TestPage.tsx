// Simple test page to debug routing
export const TestPage = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Test Page Works!</h1>
            <p>If you can see this, routing is working correctly.</p>
            <div className="mt-4">
                <a href="/buddy-dashboard" className="text-primary underline">
                    Go to Buddy Dashboard
                </a>
            </div>
        </div>
    );
};
