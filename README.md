# ModularMC Template
RegolithフィルターのModularMCのテンプレートです。

## Features
* モジュール単位で整理されたブロック,アイテム,エンティティのサンプル
* テンプレート機能を活用して簡略化されたブロック,アイテム,エンティティの実装サンプル
* BPとRPのGitによる一括管理
* セットアップ用のsetup.ps1

## ModularMCとは
[ModularMC](https://modular-mc-docs.readthedocs.io/en/stable/)はアドオンファイルをファイルの種類ではなく、目的に基づいてモジュールという単位で整理できるようにするフィルター。
テンプレート機能などを駆使してアドオン制作の効率化や自動化が可能。

## セットアップ方法

必要なもの:
- npm
- regolith
- deno

以下を実行し、質問にいくつか答え、pack_icon用の画像指定後manifestやdeno install,regolith install-allなどが完了します。
```powershell
.\setup.ps1
```
ビルドは以下のコマンドで行えます。development_behavior_packsとdevelopment_resource_packsに実装されます。
```powershell
regolith run
```
watchは以下のコマンドで行えます。
```powershell
regolith watch
```

## ファイル構造

```bash
D:.
├─.vscode
├─debug
└─packs
    ├─BP
    ├─data
    │  └─modular_mc
    │      ├─modules #スクリプト以外のモジュールをまとめる場所
    │      │  ├─blocks #スクリプト付きブロックのモジュール
    │      │  │  └─script_block
    │      │  ├─entities #スクリプト付きエンティティのモジュール
    │      │  │  └─script_entity
    │      │  ├─items #スクリプト付きアイテムのモジュール
    │      │  │  └─script_item
    │      │  └─templates
    │      │      ├─blank_blocks #ブロックのテンプレート(_blank_blocks.tsでブロックを定義)
    │      │      ├─blank_entities #エンティティのテンプレート(_blank_entities.tsでエンティティを定義)
    │      │      └─blank_items #アイテムのテンプレート(_blank_items.tsでアイテムを定義)
    │      └─src #メインのスクリプトのモジュール
    └─RP
```
