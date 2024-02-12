export const truncateText = (text:string, maxlength:number) =>{
    if(text.length <= maxlength){
      return  text
    }
    return `${text.slice(0, maxlength)}...`
  }
