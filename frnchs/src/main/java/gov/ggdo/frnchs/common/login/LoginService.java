package gov.ggdo.frnchs.common.login;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.ObjectUtils;

import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.security.UserVO;
import gov.ggdo.frnchs.ui.sysMngr.dao.SysMngrDao;
import lombok.extern.log4j.Log4j;


@Log4j
public class LoginService implements UserDetailsService {
	@Log Logger logger;
	
	@Autowired SysMngrDao sysMngrDao;
	
	@Override
	public UserVO loadUserByUsername(final String username) throws UsernameNotFoundException {
		logger.debug(">>>> loadUserByUsername:"+username);
		UserVO user = new UserVO();
		Map<String, Object> userDetail = new HashMap<String, Object>();
		try {
			userDetail.put("emailAdres", username);
			userDetail = sysMngrDao.selectAllUserInfoByEmail(userDetail);
			
			if(null != userDetail){
				// map to vo convert
				String keyAttribute = null;
			    String setMethodString = "set";
			    String methodString = null;
			    Iterator<?> itr = userDetail.keySet().iterator();

			    while(itr.hasNext()){
			        keyAttribute = (String) itr.next();
			        methodString = setMethodString+keyAttribute.substring(0,1).toUpperCase()+keyAttribute.substring(1);
			        Method[] methods = user.getClass().getDeclaredMethods();
			        for(int i=0;i<methods.length;i++){
			            if(methodString.equals(methods[i].getName()) && !ObjectUtils.isEmpty(userDetail.get(keyAttribute))){
			                try{
			                	logger.debug(">>> methods[i]:"+methods[i]+", userDetail.get(keyAttribute):"+userDetail.get(keyAttribute));
			                    methods[i].invoke(user, userDetail.get(keyAttribute).toString());
			                } catch (IllegalAccessException e) { 
			                	logger.debug(">>> map to vo convert IllegalAccessException= "+methods[i].getName()+":"+methodString);
		                	} catch (InvocationTargetException e) {
			                	logger.debug(">>> map to vo convert InvocationTargetException= "+methods[i].getName()+":"+methodString);
			                }
			            }
			        }
			    }

				List<GrantedAuthority> authorities = new ArrayList<>(); 
				authorities.add(new SimpleGrantedAuthority("ROLE_"+userDetail.get("userSeCode")));
				
				user.setAuthorities(authorities);
			}
		} catch (DataAccessException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method DataAccessException Occured");
			throw new UsernameNotFoundException("오류가 발생했습니다.");
		} catch (SQLException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method SQLException Occured");
			throw new UsernameNotFoundException("오류가 발생했습니다.");
		} catch (NullPointerException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method NullPointerException Occured");
			throw new UsernameNotFoundException("오류가 발생했습니다.");
		} catch (AuthenticationException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method AuthenticationException Occured");
			throw new UsernameNotFoundException("오류가 발생했습니다.");
		}

		// 만약 데이터가 없을 경우 익셉션
		if (userDetail == null || MapUtils.isEmpty(userDetail)){
			logger.error(">>>> loadUserByUsername user null error");
			throw new UsernameNotFoundException("사용자 정보가 존재하지 않습니다.");
		}

		return user;
	}
}