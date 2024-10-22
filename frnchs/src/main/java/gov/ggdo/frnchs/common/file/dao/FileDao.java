package gov.ggdo.frnchs.common.file.dao;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

import gov.ggdo.frnchs.common.file.domain.FileVO;

/**
 * @Class Name : FileDao.java
 * @Description : 파일공통처리 dao 인터페이스
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019. 8. 21.  scshin         최초생성
 *
 * @author scshin
 * @since 2019. 8. 21.
 * @version 1.0
 * @see
 *
 */
public interface FileDao {

	/**
	 * <PRE>
	 * 1. MethodName : selectAtchmnflStreList
	 * 2. ClassName  : FileDao
	 * 3. Comment   : 파일 조회
	 * 4. 작성자    : JasonShin
	 * 5. 작성일    : 2016. 7. 25. 오후 8:49:26
	 * </PRE>
	 *   @return List<FileVO>
	 *   @param paramMap
	 *   @return
	 *   @throws DataAccessException
	 */
	public List<FileVO> selectAtchmnflStreList(Map<String, Object> paramMap) throws DataAccessException;

	/**
	* @Method Name : selectAtchmnflStreNextSeq
	* @Description :
	* @Author : scshin
	* @since : 2019. 8. 21.
	* @param :
	* @return : String
	* @exception :
	*/
	public String selectAtchmnflStreNextSeq() throws DataAccessException;

	/**
	 * <PRE>
	 * 1. MethodName : insertAtchmnflStre
	 * 2. ClassName  : FileDao
	 * 3. Comment   : 파일 저장
	 * 4. 작성자    : JasonShin
	 * 5. 작성일    : 2016. 7. 25. 오후 8:49:31
	 * </PRE>
	 *   @return int
	 *   @param paramMap
	 *   @return
	 *   @throws DataAccessException
	 */
	public int insertAtchmnflStre(Map<String, Object> paramMap) throws DataAccessException;

	/**
	 * <PRE>
	 * 1. MethodName : updateStatCd
	 * 2. ClassName  : FileDao
	 * 3. Comment   : 데이터 상태 변경
	 * 4. 작성자    : JasonShin
	 * 5. 작성일    : 2016. 7. 26. 오전 10:13:59
	 * </PRE>
	 *   @return int
	 *   @param paramMap
	 *   @return
	 *   @throws DataAccessException
	 */
	public int updateStatCd(Map<String, Object> paramMap) throws DataAccessException;
	/**
	 * <PRE>
	 * 1. MethodName : updateStatCdTmp
	 * 2. ClassName  : FileDao
	 * 3. Comment   : 데이터 상태 변경
	 * 4. 작성자    : JasonShin
	 * 5. 작성일    : 2016. 7. 26. 오전 10:13:59
	 * </PRE>
	 *   @return int
	 *   @param paramMap
	 *   @return
	 *   @throws DataAccessException
	 */
	public int updateStatCdTmp(Map<String, Object> paramMap) throws DataAccessException;

}
