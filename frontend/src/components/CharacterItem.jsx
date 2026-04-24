function CharacterItem( { character }) {
    return (
        <li className="bg-slate-700/50 p-3 rounded-lg border border-slate-600 mb-2 hover:bg-slate-700 transition-colors">
            <span className="text-blue-300 font-medium">{character.name}</span>
        </li>
    )
}

export default CharacterItem;