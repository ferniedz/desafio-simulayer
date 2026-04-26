const styles = {
    container: "p-8 bg-slate-900 min-h-screen text-white",
    grid: "grid grid-cols-1 md:grid-cols-3 gap-6",      //interface responsiva: se a tela for pequena, mostra cenas 1 embaixo da outra, se for grande, mostra em 3 colunas
    header: "flex justify-between items-center mb-8",
    title: "text-3xl font-bold text-blue-400",
    sectionTitle: "text-xl font-semibold mt-8 mb-4 border-b border-slate-700 pb-2 text-slate-200",
    btnBase: "px-4 py-2 rounded-lg font-semibold transition-all duration-200 active:scale-95",
    btnCreate: "bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold transition-all",
    btnNav: "bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed",
    btnSubmit: "w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold transition-all active:scale-95 disabled:opacity-50",
    btnCancel: "mt-4 text-slate-500 hover:text-slate-300 transition-colors w-full text-center",
    btnAdd: "bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 active:scale-95",
    btnDelete: "mt-4 bg-red-600 hover:bg-red-500 text-white w-full py-2 rounded-lg font-semibold transition-all active:scale-95",
    btnBack: "mb-6 text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2",
    contentWrapper: "bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl",
    card: "p-6 bg-slate-800 border border-slate-700 rounded-xl shadow-lg hover:border-blue-500 transition-all",
    description: "text-slate-400 line-clamp-2",     //"line-clamp-2" de <p></p> corta a descricao em 2 linhas e adiciona ... se for muito grande//
    characterName: "text-xl font-bold text-blue-400 mb-2",
    prompt: "text-slate-400 text-sm line-clamp-3",
    emptyMessage: "text-slate-500 italic",
    label: "block text-sm font-medium text-slate-400 mb-1",
    input: "w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mb-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all",
    textArea: "w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors mb-6 h-32 resize-none",
    select: "bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500",
    feedbackSucess: "text-green-400 text-sm mb-4",
    feedbackError: "text-red-500 text-sm mb-4",
    footer: "mt-12 flex justify-center items-center gap-4",
}

export default styles;

//title: "text-xl font-bold text-blue-400 mb-2", vindo do ScenCards

/*  container: "p-8 bg-slate-900 min-h-screen text-white flex flex-col items-center",
    card: "bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl w-full max-w-lg",
    title: "text-3xl font-bold text-blue-400 mb-6 text-center",

    vindos de CreateCharacter

*/

//btn: "bg-blue-600 hover:bg-blue-500 text-white w-full text-center block mt-4 py-2 rounded-lg font-semibold",

/* container: "p-8 bg-slate-900 min-h-screen text-white flex flex-col items-center",
    card: "bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl w-full max-w-lg",
    title: "text-3xl font-bold text-blue-400 mb-6 text-center",
    label: "block text-sm font-medium text-slate-400 mb-1",
    input: "w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all",
    textArea: "w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors mb-6 h-32 resize-none",
    btnSubmit: "w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold transition-all active:scale-95 disabled:opacity-50",
    btnCancel: "mt-4 text-slate-500 hover:text-slate-300 transition-colors w-full text-center"
    
    vindos de CreaetScene */

    /* 
    container: "p-8 bg-slate-900 min-h-screen text-white",
    
    
    title: "text-3xl font-bold text-blue-400 mb-2",
    description: "mt-4 text-slate-300 leading-relaxed", */