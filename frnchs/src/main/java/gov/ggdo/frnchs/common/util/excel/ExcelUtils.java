package gov.ggdo.frnchs.common.util.excel;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelUtils {
   
	public static void commonCellStyle(String type, XSSFWorkbook workbook, XSSFCell cell) {
		CellStyle style = workbook.createCellStyle();

		// 테두리 선 (우,좌,위,아래)
		style.setBorderRight(BorderStyle.THIN);
		style.setBorderLeft(BorderStyle.THIN);
		style.setBorderTop(BorderStyle.THIN);
		style.setBorderBottom(BorderStyle.THIN);
		
		// 가운데 정렬
		style.setAlignment(HorizontalAlignment.CENTER);
		
		if("header".equals(type)) {
			style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
			style.setFillPattern(FillPatternType.SOLID_FOREGROUND);

		}
		
		cell.setCellStyle(style);
	}
	
	public static void commonCellStyle(XSSFWorkbook workbook, XSSFCell cell) {
		commonCellStyle("", workbook, cell);
	}
}