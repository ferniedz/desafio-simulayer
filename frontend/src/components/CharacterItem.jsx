function CharacterItem( { character, onRemove }) {
    return (
        <li className="bg-slate-700/50 p-3 rounded-lg border border-slate-600 mb-2 hover:bg-slate-700 transition-colors flex items-center justify-between">
            <span className="text-blue-300 font-medium">{character.name}</span>

            {onRemove && (
                <button
                    onClick={() => onRemove(character.id)}
                    className="bg-red-600/80 hover:bg-red-500 text-white text-xs px-3 py-1 rounded-md font-bold transition-all duration-200 active:scale-95 shadow-sm"
                >
                Remove character from this scene
                </button>
            )}

        </li>
    )
}

export default CharacterItem;

//remover o personagem da cena e diferente de exclui-lo