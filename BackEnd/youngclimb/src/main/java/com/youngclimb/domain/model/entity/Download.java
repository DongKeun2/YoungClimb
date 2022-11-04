package com.youngclimb.domain.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_download")
public class Download {
    @Id
    @Column(name = "id")
    private Integer id;
    // 다운로드 수
    @Column(name = "downloads")
    private Integer download;

    public Download addCount() {
        this.download ++;
        return this;
    }
}
