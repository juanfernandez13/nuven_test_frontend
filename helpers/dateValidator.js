export default function dateValidator(value) {
  const [dia, mes, ano] = value.split("/").map(Number);

      if (mes < 1 || mes > 12) {
        return true;
      }

      const diasPorMes = [
        31,
        (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0 ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ];

      if (dia < 1 || dia > diasPorMes[mes - 1]) {
        return true;
      }

      if (ano < 1900 || ano > 2100) {
        return true;
      } else {
        return false
      }
    
}