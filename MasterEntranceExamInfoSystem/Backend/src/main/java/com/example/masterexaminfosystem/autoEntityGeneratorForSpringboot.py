import os
import re


def to_camel_case(string):
    # 如果字符串为空，则直接返回空字符串
    if not string:
        return ""

    # 将字符串按照空格或下划线分割成单词列表
    words = re.split(r"\s|_", string)

    # 将单词列表中的每个单词首字母大写，并拼接起来
    camel_case = ''.join(word.capitalize() for word in words)

    # 将第一个单词的首字母小写
    camel_case = camel_case[0].lower() + camel_case[1:]

    return camel_case

path = os.getcwd()
pos = path.find('com')
package = path[pos:].replace('\\', '.')
# print(package)
# 获取表数据
tableName = input('Please input the name of the table you want to add:\n')
columnNumber = int(input('Please input the number of the columns(except for primary column "id"):\n'))
print('Please input the column name, variable type sequentially(except for primary column "id"):')
columns = []
for i in range(columnNumber):
    columns.append(input().split(' '))

# 生成pojo.entity
columnsCode = ''
for i in range(columnNumber):
    columnCode = f'''@Column(name = "{columns[i][0]}")
    private {columns[i][1]} {to_camel_case(columns[i][0])};

    '''
    columnsCode += columnCode
pojoEntity = f'''package {package}.pojo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "{tableName}")
public class {tableName.title()} {{
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    {columnsCode}
}}'''


# 生成repository, service, serviceImpl, controller
repo = f'''package {package}.repository;

import {package}.pojo.entity.{tableName.title()};
import org.springframework.data.jpa.repository.JpaRepository;

public interface {tableName.title()}Repository extends JpaRepository<{tableName.title()}, Long> {{
}}'''
service = f'''package {package}.service;

import {package}.pojo.entity.{tableName.title()};
import java.util.List;
public interface {tableName.title()}Service {{
    {tableName.title()} insert{tableName.title()}({tableName.title()} {tableName});

    void delete{tableName.title()}(Long id);

    {tableName.title()} update{tableName.title()}({tableName.title()} {tableName});

    List <{tableName.title()}> findAll{tableName.title()}();

    {tableName.title()} find{tableName.title()}ById(Long id);
}}'''
serviceImpl = f'''package {package}.service;

import {package}.pojo.entity.{tableName.title()};
import {package}.repository.{tableName.title()}Repository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import java.util.List;

@Service

public class {tableName.title()}ServiceImpl implements {tableName.title()}Service{{
    @Resource
    private {tableName.title()}Repository {tableName}Repository;

    @Override
    public {tableName.title()} insert{tableName.title()}({tableName.title()} {tableName}) {{
        return {tableName}Repository.save({tableName});
    }}

    @Override
    public void delete{tableName.title()}(Long id) {{
        {tableName}Repository.deleteById(id);
    }}

    @Override
    public {tableName.title()} update{tableName.title()}({tableName.title()} {tableName}) {{
        return {tableName}Repository.save({tableName});
    }}

    @Override
    public List<{tableName.title()}> findAll{tableName.title()}() {{
        return {tableName}Repository.findAll();
    }}

    @Override
    public {tableName.title()} find{tableName.title()}ById(Long id) {{
        return {tableName}Repository.findById(id).orElse(null);
    }}
}}'''
controller = f'''package {package}.controller;

import {package}.pojo.entity.{tableName.title()};
import {package}.service.{tableName.title()}Service;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/{tableName}")
public class {tableName.title()}Controller {{
    @Resource
    {tableName.title()}Service {tableName}Service;

    @GetMapping("")
    public List<{tableName.title()}> findAll() {{
        return {tableName}Service.findAll{tableName.title()}();
    }}

    @GetMapping("/{{id}}")
    public {tableName.title()} findById(@PathVariable("id") Long id) {{
        return {tableName}Service.find{tableName.title()}ById(id);
    }}

    @PostMapping("")
    public {tableName.title()} add{tableName.title()}(@RequestBody {tableName.title()} {tableName.title()}) {{
        return {tableName}Service.insert{tableName.title()}({tableName.title()});
    }}

    @DeleteMapping("/{{id}}")
    public void delete{tableName.title()}(@PathVariable("id") Long id) {{
        {tableName}Service.delete{tableName.title()}(id);
    }}

    @PutMapping("")
    public {tableName.title()} update{tableName.title()}(@RequestBody {tableName.title()} {tableName.title()}) {{
        return {tableName}Service.update{tableName.title()}({tableName.title()});
    }}

}}'''

# 写入文件
with open(f'pojo/entity/{tableName.title()}.java', 'w') as f:
    f.write(pojoEntity)
with open(f'repository/{tableName.title()}Repository.java', 'w') as f:
    f.write(repo)
with open(f'service/{tableName.title()}Service.java', 'w') as f:
    f.write(service)
with open(f'service/{tableName.title()}ServiceImpl.java', 'w') as f:
    f.write(serviceImpl)
with open(f'controller/{tableName.title()}Controller.java', 'w') as f:
    f.write(controller)

print('File generation complete')
'''
Fav
2
user_id Long userId
university_id Long universityId
'''
