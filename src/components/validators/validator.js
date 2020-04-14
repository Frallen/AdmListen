export const required=value=>{
    if(value)return undefined
    return "Это обязательное поле"
}

export const OnlyNum=value=>{
    if (!/^[0-9\s]*$/.test(value)) return `Только цифры`;
    return undefined;
}

export const MinLengthTel=value=>{
    if(value.length<11) return `Номер состоит из 11 чисел`
    return undefined
}

export const MinLengthIndex=value=>{
    if(value.length<6) return "Индекс состоит из 6 чисел"
    return undefined
}

export const OnlyLett=value=>{
    if (!/^[a-zA-Zа-яА-Я\s]*$/.test(value))
    return `ФИО состоит только из букв`;
  return undefined;
}