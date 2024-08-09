export function reactPreprocess(str: string){
  return str.toLowerCase().replaceAll(' ', '');
}