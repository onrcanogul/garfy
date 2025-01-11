package com.petstagram.socialmedia.dto.status;

import com.petstagram.socialmedia.dto.base.BaseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class StatusDto extends BaseDto {
    private List<UUID> users = new ArrayList<>();
}
