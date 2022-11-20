package com.youngclimb.domain.model.entity;

import com.youngclimb.domain.model.dto.board.BoardMediaDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_board_media")
public class BoardMedia {
    // 영상번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "media_id")
    private Long id;
    // 글번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;
    // 영상 파일 이름
    @Column(name = "media_path")
    private String mediaPath;

    @Column(name="thumbnail_path")
    private String thumbnailPath;

    public BoardMediaDto toMediaDto() {
        return BoardMediaDto.builder()
                .mediaId(id)
                .mediaPath(mediaPath)
                .thumbnailPath(thumbnailPath)
                .build();
    }


}
