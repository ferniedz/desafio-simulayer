function Loading() {
    return (
        <div className="flex items-center justify-center p-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <span className="ml-3 text-white">Loading...</span>
        </div>
    );
}

export default Loading;