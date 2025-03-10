//package com.petstagram.apigateway;
//
//import org.springframework.core.convert.converter.Converter;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.oauth2.jwt.Jwt;
//
//import java.util.Collection;
//import java.util.Collections;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//public class KeycloakRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
//
//    @Override
//    public Collection<GrantedAuthority> convert(Jwt jwt) {
//        Map<String, Object> realmAccess = jwt.getClaimAsMap("realm_access");
//        if (realmAccess == null || !realmAccess.containsKey("roles")) {
//            return Collections.emptyList();
//        }
//
//        Object rolesObject = realmAccess.get("roles");
//        if (!(rolesObject instanceof List)) {
//            return Collections.emptyList();
//        }
//
//        return ((List<String>) rolesObject).stream()
//                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
//                .collect(Collectors.toList());
//    }
//}
